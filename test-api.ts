async function test() {
  const params = new URLSearchParams();
  params.append('keyapi', '86eb4596fbb506a43b1b63b5911a5c78');
  params.append('phone', '0928886584');
  params.append('gift_link', 'dummy');

  const res = await fetch('https://www.planariashop.com/api/truewallet.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });
  console.log('Wallet:', await res.text());

  const params2 = new URLSearchParams();
  params2.append('keyapi', '86eb4596fbb506a43b1b63b5911a5c78');
  params2.append('qrcode_text', 'dummy');
  
  const res2 = await fetch('https://www.planariashop.com/api/checkslip.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params2
  });
  console.log('Slip:', await res2.text());
}
test();
