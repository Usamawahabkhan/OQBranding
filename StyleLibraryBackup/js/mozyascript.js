document.getElementById('content-tab1').style.display = 'block';
function openTab(tabName) {
    // Hide all tab content
    let contents = document.querySelectorAll('.content');
    contents.forEach(content => content.style.display = 'none');

    // Remove active class from all tabs
    let tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show the clicked tab's content and add active class
    document.getElementById('content-' + tabName).style.display = 'block';
    document.getElementById(tabName).classList.add('active');
}
