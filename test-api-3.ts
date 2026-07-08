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
  console.log('Wallet status:', res.status, res.headers.get('content-type'));
  console.log('Wallet text:', await res.text());
}
test();
