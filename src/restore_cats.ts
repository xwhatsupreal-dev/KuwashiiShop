import http from 'http';

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/d1',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response:', data));
});

req.write(JSON.stringify({
  sql: "UPDATE system_config SET announcement_settings = json_set(COALESCE(announcement_settings, '{}'), '$.categories', json( ? )) WHERE id = 'main'",
  params: [JSON.stringify([
    {
      title: 'ROV',
      subtitle: 'สุ่มสกิน',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      color: 'from-blue-500/20 to-blue-500/5',
      borderColor: 'hover:border-blue-500/50',
      btnColor: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
    },
    {
      title: 'Free Fire',
      subtitle: 'สุ่มเพชร',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80',
      color: 'from-orange-500/20 to-orange-500/5',
      borderColor: 'hover:border-orange-500/50',
      btnColor: 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20'
    },
    {
      title: 'Valorant',
      subtitle: 'สุ่มพ้อยปืน',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
      color: 'from-purple-500/20 to-purple-500/5',
      borderColor: 'hover:border-purple-500/50',
      btnColor: 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20'
    }
  ])]
}));
req.end();
