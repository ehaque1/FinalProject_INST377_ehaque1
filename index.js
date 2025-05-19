const express = require('express');
const serverless = require('serverless-http');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL || 'https://tpajhjgyinbsuvvikcdt.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwYWpoamd5aW5ic3V2dmlrY2R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MjM2MDEsImV4cCI6MjA2MzA5OTYwMX0.ymuTlarS2CErMUs_cN9oXcnYtE72Y2fpF_aNHyS0YSU';
const supabase = createClient(supabaseUrl, supabaseKey);

// API Endpoints
app.get('/api/coffees', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Coffees')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error('GET /api/coffees error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/coffees', async (req, res) => {
  try {
    const { name, origin, brewing_method, description, strength, image_url } = req.body;

    // Validation
    if (!name || !origin || !brewing_method) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('Coffees')
      .insert([{
        name,
        origin,
        brewing_method,
        description: description || null,
        strength: strength ? parseInt(strength) : null,
        image_url: image_url || null
      }])
      .select('*');

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    console.error('POST /api/coffees error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', supabase: 'connected' });
});

module.exports = app;
module.exports.handler = serverless(app);