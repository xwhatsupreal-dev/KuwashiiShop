async function checkApiStatus() {
  try {
    const res = await fetch('https://www.planariashop.com/api/checkslip.php', {
       method: 'GET'
    });
    console.log(res.status);
  } catch(e) {
    console.error(e);
  }
}
checkApiStatus();
