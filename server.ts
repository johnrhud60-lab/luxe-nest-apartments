import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Mock Database
  const properties = [
    {
      id: '1',
      title: 'The Sky Penthouse',
      location: 'New York, NY',
      price: 12500,
      beds: 3,
      baths: 3.5,
      sqft: 2800,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1527359443443-84a48abc7df0?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1513584684374-8bdb74838a0f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Ultra-luxury penthouse with panoramic views of Central Park. Features floor-to-ceiling windows, a private terrace, and bespoke finishes throughout.',
      amenities: ['Private Elevator', '24/7 Concierge', 'Infinity Pool', 'Wine Cellar', 'Smart Home System', 'Private Gym'],
      region: 'US'
    },
    {
      id: '2',
      title: 'Nairobi Heights Villa',
      location: 'Nairobi, Kenya',
      price: 4500,
      beds: 4,
      baths: 4,
      sqft: 3500,
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1613977257371-4f7499b601d0?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1613977257373-72ad7d618c44?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1613977257375-72ad7d618c46?auto=format&fit=crop&w=1200&q=80'
      ],
      description: 'Modern luxury villa in the heart of Karen, Nairobi. This stunning property offers spacious living areas, a lush garden, and top-tier security.',
      amenities: ['Garden', 'Swimming Pool', 'Solar Power', 'High Security', 'Staff Quarters', 'Borehole'],
      region: 'Africa'
    }
  ];

  const applications: any[] = [
    {
      id: 'demo-1',
      propertyId: '1',
      fullName: 'John Doe',
      email: 'john@example.com',
      income: 15000,
      status: 'payment_confirmed',
      createdAt: new Date().toISOString()
    }
  ];

  // API Routes
  app.get('/api/properties', (req, res) => {
    res.json(properties);
  });

  app.get('/api/properties/:id', (req, res) => {
    const property = properties.find(p => p.id === req.params.id);
    if (property) res.json(property);
    else res.status(404).json({ error: 'Property not found' });
  });

  // PesaPal Integration
  app.post('/api/payments/initiate', async (req, res) => {
    const { amount, email, firstName, lastName, propertyId, income, occupation, message } = req.body;
    
    try {
      // In a real app, we'd save the application as 'pending' here
      const appId = uuidv4();
      applications.push({
        id: appId,
        propertyId,
        fullName: `${firstName} ${lastName}`,
        email,
        income,
        occupation,
        message,
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      // 1. Get Access Token
      const authResponse = await axios.post(`${process.env.PESAPAL_API_URL}/api/Auth/RequestToken`, {
        consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.PESAPAL_CONSUMER_SECRET
      });

      const token = authResponse.data.token;

      // 2. Submit Order
      const orderData = {
        id: appId, // Use application ID as tracking ID
        amount: amount,
        currency: 'USD',
        description: `Application fee for property ${propertyId}`,
        callback_url: `${process.env.APP_URL}/payment-callback`,
        notification_id: process.env.PESAPAL_IPN_ID,
        billing_address: {
          email_address: email,
          first_name: firstName,
          last_name: lastName
        }
      };

      const orderResponse = await axios.post(
        `${process.env.PESAPAL_API_URL}/api/Transactions/SubmitOrderRequest`,
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      res.json(orderResponse.data);
    } catch (error: any) {
      console.error('PesaPal Error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to initiate payment' });
    }
  });

  app.post('/api/webhooks/pesapal', (req, res) => {
    const { OrderTrackingId, OrderNotificationType } = req.body;
    console.log('PesaPal Webhook received:', OrderTrackingId, OrderNotificationType);
    
    const application = applications.find(a => a.id === OrderTrackingId);
    if (application) {
      application.status = 'payment_confirmed';
    }
    
    res.status(200).send('OK');
  });

  // Admin Routes
  app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  app.get('/api/admin/applications', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'secret');
      // Enrich applications with property titles
      const enriched = applications.map(app => ({
        ...app,
        propertyTitle: properties.find(p => p.id === app.propertyId)?.title || 'Unknown Property'
      }));
      res.json(enriched);
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
