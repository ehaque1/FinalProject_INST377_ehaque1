const express = require('express');
const fetch = require('node-fetch');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());

// Supabase setup
const supabaseUrl = 'https://tpajhjgyinbsuvvikcdt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwYWpoamd5aW5ic3V2dmlrY2R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MjM2MDEsImV4cCI6MjA2MzA5OTYwMX0.ymuTlarS2CErMUs_cN9oXcnYtE72Y2fpF_aNHyS0YSU';
const supabase = createClient(supabaseUrl, supabaseKey);

// GET: All Coffees
app.get('/coffees', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('Coffees')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching coffees:', error);
    res.status(500).json({ error: 'Failed to fetch coffees' });
  }
});

// POST: Add a new Coffee
app.post('/add-coffee', async (req, res) => {
  const { name, origin, brewing_method, strength, description, image_url } = req.body;
  
  // Validate required fields
  if (!name || !origin || !brewing_method || !strength || !description) {
    return res.status(400).json({ error: 'All fields except image URL are required' });
  }

  // Validate strength is between 1-5
  if (strength < 1 || strength > 5) {
    return res.status(400).json({ error: 'Strength must be between 1 and 5' });
  }

  try {
    const { data, error } = await supabase
      .from('Coffees')
      .insert([{ 
        name, 
        origin, 
        brewing_method, 
        strength, 
        description, 
        image_url 
      }])
      .select();

    if (error) throw error;

    res.json({ 
      message: 'Coffee added successfully!', 
      coffee: data[0] 
    });
  } catch (error) {
    console.error('Error adding coffee:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Remove a Coffee
app.delete('/delete-coffee/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const { error } = await supabase
      .from('Coffees')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Coffee deleted successfully' });
  } catch (error) {
    console.error('Error deleting coffee:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET: Random Coffee Image
app.get('/random-coffee', async (req, res) => {
  try {
    const response = await fetch('https://coffee.alexflipnote.dev/random.json');
    const json = await response.json();
    res.json(json);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch random coffee image' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});