
const colours = ['red', 'green', 'blue', 'baw', 'tas'];

function load_theme() {

    let theme = localStorage.getItem('theme') || 'tas';
    if(colours.indexOf(theme) == -1) theme = 'tas';
    apply_theme(theme);

}

const p = () => {
  
    let _ = confirm('subscribe to mafew now :)');
    if(!_) p();
    
}

function apply_theme(colour) {
    
    if(colours.indexOf(colour) == -1) return;
    colours.forEach(c => document.body.classList.remove(c));
    localStorage.setItem('theme', colour);
    document.body.classList.add(colour);

}
