
// Reading from drive
const fs = require('fs');

// Sending web requests
const request = require('request');

// ————————————————————————————————— //

// Create express app
const app  = require('express')();

// Create server through HTTP for sockets in the future
const http = require('http').createServer(app);

// Settings
app.set('view engine', 'ejs');
app.set('views', __dirname + '/pages');

// Start the server.
http.listen(process.env.PORT || 3000, () => console.log('Started!'));

// ————————————————————————————————— //

// Github repo array
let projects = [];

function update_projects() {

    // Request options
    let options = {

        url: 'https://api.github.com/users/matthewtgm/repos?per_page=100',
        headers: {
            'User-Agent': 'request'
        }

    }

    // Get repo list from github
    request(options, (err, res, body) => {

        if(err) return console.log(body, err);

        let _;
        try { _ = JSON.parse(body); } catch (err) { console.log('Non-JSON body given by github.', body); }

        if(!_) return;
        projects = _.filter(p => !p.disabled && !p.archived && p.description != null).map(p => {

            let description = p.description.match(/[.!?]$/) ? p.description : p.description + '.';
            description = description[0].toUpperCase() + description.slice(1);

            return {

                name: p.name,
                description: description,
                fork: p.fork,
                links: {
                    github: p.html_url,
                    homepage: p.homepage,
                    wiki: /* p.has_wiki ? p.html_url + '/wiki' : */ null
                }

            }

        });

    });

}

// Update immmediately and keep projects up to date ever hour
update_projects(); setInterval(update_projects, 1 * 60 * 60 * 1000);

// ————————————————————————————————— //

app.get('*', (req, res) => {

    // Remove the '/' from the beginning of the path.
    let path = req.path.slice(1);

    // Default to /index route.
    if(!path) path = 'index';

    // Non-page stuff like CSS & images.
    if(path.startsWith('p/')) {

        // Trim the '/p' from the start.
        path = path.slice(2);

        // If the file exists, send it.
        if(fs.existsSync(`./public/${path}`)) return res.sendFile(`${__dirname}/public/${path}`);

        // Otherwise, send a 404.
        return res.status(404).end();

    }

    // If the page exists, render it.
    if(fs.existsSync(`./pages/${path}.ejs`)) return res.render(`${path}.ejs`, { projects: JSON.stringify(projects) });

    // Otherwise render a 404.
    return res.render('404.ejs');

});

// ————————————————————————————————— //

app.post('*', (req, res) => {

    // No POST paths are supported.
    res.status(404).end();

});

// ————————————————————————————————— //