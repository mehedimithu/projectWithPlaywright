function handleContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (confirm('Send this message?')) {
        alert('Message sent successfully!');
        document.getElementById('contactForm').reset();
    }
    
    return false;
}