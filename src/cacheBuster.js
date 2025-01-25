async function cacheBuster() {
    try {
      const response = await fetch(`/version.txt?v=${new Date().getTime()}`, { cache: 'no-cache' });
      const newVersion = await response.text();

      const storedVersion = localStorage.getItem('app_version');

      if (storedVersion && storedVersion !== newVersion) {
        localStorage.setItem('app_version', newVersion);

        if (!sessionStorage.getItem('has_reloaded')) {
          sessionStorage.setItem('has_reloaded', 'true');
          window.location.reload();
        }
      } else {
        localStorage.setItem('app_version', newVersion);
      }
    } catch (error) {
      console.error('Error checking version:', error);
    }
}
  
module.exports = cacheBuster;
  