require(['notificationjs'], function(Notificationjs) {
    var

    // Build our Notifications    
        helloWorld = new Notificationjs({
            title: 'Hello World!',
            description: 'This is a notificationjs.js message',
	    image: 'images/doggy.jpg',
	    imageAlt: 'doggy',
            enterClass: 'animated fadeInDown',
            exitClass: 'animated fadeOutUp',
            duration: 3000
        }),

        anotherMessage = new Notificationjs({
            title: 'Another Message',
            description: 'Here is another message',
	    image: 'images/eagle.jpg',
	    imageAlt: 'eagle',
            enterClass: 'animated fadeInLeft',
            exitClass: 'animated fadeOutLeft',
            duration: 3000
        }),

        oneLastMessage = new Notificationjs({
            title: 'One Last Message',
            description: 'This is one last message',
	    image: 'images/van.jpg',
	    imageAlt: 'van',
            enterClass: 'animated fadeInUp',
            exitClass: 'animated fadeOutDown'
        }),

        // Get buttons
        notificationjsOne = document.getElementById('notificationjs-one'),
        notificationjsTwo = document.getElementById('notificationjs-two'),
        notificationjsThree = document.getElementById('notificationjs-three');

    // Event Listeners
    notificationjsOne.addEventListener('click', function(e) {
        e.preventDefault();
        helloWorld.go();
    });

    notificationjsTwo.addEventListener('click', function(e) {
        e.preventDefault();
        anotherMessage.go();
    });

    notificationjsThree.addEventListener('click', function(e) {
        e.preventDefault();
        oneLastMessage.go();
    });

});
