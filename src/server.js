/* --------------- server.js --------------- */

"use strict";

{
    console.clear();

    /* --------------- Require modules --------------- */

    const
        express = require("express"),
        path = require("path"), // This is a node module, no need to install it using npm
        hbs = require("hbs"),
        localModule = require("./utils/localModule.js");

    /* --------------- Create server --------------- */

    const
        server = express(),
        port = process.env.PORT || 3000;

    // process.env.PORT is the port in which the server is running, dictated by the host
    // 3000 is a localhost port, accesible via http://localhost:3000/


    /* --------------- Configure server --------------- */

    // Define paths for express configuration
    const
        publicDirectoryPath = path.join(__dirname, "../public"), // The directory served, in which files are looked for when requesting them
        viewsPath = path.join(__dirname, "../templates/views"), // The directory for the views to be rendered
        partialsPath = path.join(__dirname, "../templates/partials"); // The directory for the partials to be used in the views

    // Setup static directory to serve
    server.use(express.static(publicDirectoryPath));

    // Setup handlebars engine and views location
    server.set("view engine", "hbs");
    server.set("views", viewsPath);
    hbs.registerPartials(partialsPath);


    /* --------------- Configure server responses --------------- */

    // If only using static html pages, no need to configure the responses
    // But you must use the full file name "static.html"

    // By default, the homepage is looked for as "index.html"

    // Use server.get to handle non static files or paths
    // To handle the index if not using a static file, use an empty string as the argument to get

    // respone.render(..) sends an object with the properties used in the views
    server.get("", (request, response) => {
        response.render("index", {
            title: "Index"
        });
    });

    // Use views to render
    server.get("/view1", (request, response) => {
        response.render("view1", {
            title: "View 1",
            content: "Im the first View"
        });
    });

    server.get("/view2", (request, response) => {
        response.render("view2", {
            title: "View 2",
            content: "Im the second View"
        });
    });

    // Use utils to send messages
    // response.send(..) sends exatly what we put as argument, JSON stringified
    server.get("/double", (request, response) => {
        if (!request.query.number) {
            return response.send({
                error: "You must provide a number"
            });
        }
        localModule(request.query.number, (error, localModuleResponse) => {
            if (error) return response.send({
                error: "The input is not a valid number"
            });
            response.send({
                result: localModuleResponse
            });
        });
    });

    // 404 - Pages not found

    // 404 page for specific addresses
    server.get("/address/*", function (request, response) {
        response.render("404", {
            title: "404 page for address"
        });
    });

    // Important to configure this 404 page at last, to catch all not configured cases
    server.get("*", function (request, response) {
        response.render("404", {
            title: "404 page for all other cases"
        });
    });

    /* --------------- Get server running --------------- */

    server.listen(port, function () {
        console.log(`Server is running on port ${port}`);
    });
}