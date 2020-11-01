const create_projects = projects => {

    projects.forEach(p => {
    
        let _ = document.createElement('div');
        document.getElementById('projects').appendChild(_);
    
        _.classList.add('project');
        _.innerHTML = `
    
            <h1>${p.name}${p.fork ? `<span class="fork"> (Fork) </span>` : ''}</h1> 
            
            <p>
                ${p.description}
            </p>
    
            <div class="links">
                ${p.links.github   ? `<a href="${p.links.github  }" target="_blank" class="ic git"><i class="fab fa-github"></i></a>` : ''}
                ${p.links.homepage ? `<a href="${p.links.homepage}" target="_blank" class="ic def"><i class="fas fa-home"></i></a>` : ''}
                ${p.links.wiki     ? `<a href="${p.links.wiki}"     target="_blank" class="ic def"><i class="fas fa-book"></i></a>` : ''}
            </div>
    
        `;
    })

}
