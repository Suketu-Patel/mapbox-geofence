const requestPermission = () => {
    Notification.requestPermission(function (status) {
    console.log('Notification permission status:', status);
});
}

const registerServiceWorker = ()=> {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('sw.js')
            .then(function (registration) {
                //do whatever you want with this..
         })
           .catch(function (err) {
             console.log("Service Worker Failed to Register", err);
          }) 
    }
}

const displayNotification = () => {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then((reg) => {
            reg.showNotification('You have a task here',{
                "vibrate": [300,100,400],
                "icon":"https://img.icons8.com/bubbles/344/appointment-reminders.png"
            });
        });
    }
}
export {requestPermission,displayNotification,registerServiceWorker}