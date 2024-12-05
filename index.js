const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();  

const app = express();
const port = 3000;

const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_KEY  
);

app.use(bodyParser.json());

// =================== USER =====================

app.get('/users', async (req, res) => {
  const { data, error } = await supabase
    .from('users') 
    .select('id, name, email'); 

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data); 
});


app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email }])
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data); 
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).json({ error: 'At least one field (name or email) must be provided' });
  }

  const { data, error } = await supabase
    .from('users')
    .update({ name, email })
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data); 
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data); 
});

// =================== SPORTS PLACE =====================

app.get('/sports_place', async (req, res) => {
  const { data, error } = await supabase
    .from('sports_place') 
    .select('id, name, location, owner_id'); 

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data); 
});

app.post('/sports_place', async (req, res) => {
  const { name, location, owner_id } = req.body;

  if (!name || !location || !owner_id) {
    return res.status(400).json({ error: 'Name, location, and owner ID are required' });
  }

  const { data, error } = await supabase
    .from('sports_place')
    .insert([{ name, location, owner_id }])
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data); 
});

app.put('/sports_place/:id', async (req, res) => {
  const { id } = req.params;
  const { name, location, owner_id } = req.body;

  if (!name && !location && !owner_id) {
    return res.status(400).json({ error: 'At least one field (name, location, or owner_id) must be provided' });
  }

  const { data, error } = await supabase
    .from('sports_place')
    .update({ name, location, owner_id })
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data); 
});

app.delete('/sports_place/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('sports_place')
    .delete()
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data); 
});

// =================== AVAILABILITY =====================

app.get('/availability', async (req, res) => {
  const { data, error } = await supabase
    .from('availability') 
    .select('id, sports_place_id, available_date, start_time, end_time'); 

  if (error) {
    console.error("Erro ao buscar disponibilidades:", error); 
    return res.status(500).json({ error: error.message });
  }

  if (data.length === 0) {
    return res.status(404).json({ message: 'No availability found' }); 
  }

  return res.status(200).json(data); 
});

app.post('/availability', async (req, res) => {
  const { sports_place_id, available_date, start_time, end_time } = req.body;

  if (!sports_place_id || !available_date || !start_time || !end_time) {
    return res.status(400).json({ error: 'sports_place_id, available_date, start_time, and end_time are required' });
  }

  const { data, error } = await supabase
    .from('availability')
    .insert([{ sports_place_id, available_date, start_time, end_time }])
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data); 
});

app.put('/availability/:id', async (req, res) => {
  const { id } = req.params;
  const { sports_place_id, available_date, start_time, end_time } = req.body;

  if (!sports_place_id && !available_date && !start_time && !end_time) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  const { data, error } = await supabase
    .from('availability')
    .update({ sports_place_id, available_date, start_time, end_time })
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data); 
});

app.delete('/availability/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('availability')
    .delete()
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data); 
});

// =================== RESERVATION =====================

app.get('/reservation', async (req, res) => {
  const { data, error } = await supabase
    .from('reservation') 
    .select('id, user_id, sports_place_id, reservation_date, reservation_time'); 

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data); 
});

app.post('/reservation', async (req, res) => {
  const { user_id, sports_place_id, reservation_date, reservation_time } = req.body;

  if (!user_id || !sports_place_id || !reservation_date || !reservation_time) {
    return res.status(400).json({ error: 'User ID, place ID, date, and time are required' });
  }

  const { data, error } = await supabase
    .from('reservation')
    .insert([{ user_id, sports_place_id, reservation_date, reservation_time }])
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data); 
});

app.put('/reservation/:id', async (req, res) => {
  const { id } = req.params;
  const { user_id, sports_place_id, reservation_date, reservation_time } = req.body;

  if (!user_id && !sports_place_id && !reservation_date && !reservation_time) {
    return res.status(400).json({ error: 'At least one field must be provided to update' });
  }

  const { data, error } = await supabase
    .from('reservation')
    .update({ user_id, sports_place_id, reservation_date, reservation_time })
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data); 
});

app.delete('/reservation/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('reservation')
    .delete()
    .eq('id', id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data); 
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
