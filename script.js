document.addEventListener("DOMContentLoaded", function() {
    function getPageContent(page) {
        const pages = {
            "about": `
                <h2>About Me</h2>
                <p class="about-text">I'm a dedicated Full-stack Developer with a passion for creating
                innovative solutions. My career goal is to continue delivering value to clients through
                technology-driven solutions. I have contributed to projects at the Arctic Research Foundation
                and have completed my diploma in Business Information Technology at Red River College Polytechnic,
                where I've gained expertise in software development, database management, and project management.</p>
                <p>I’m currently updating my web portfolio, so please accept this basic/limited version in the meantime.</p>
            `,
            "skills": `
                <h2>Technical Skills</h2>
                <div class="skills-container">
                    <div class="skill-item"><strong>Languages:</strong> C#, Python, JavaScript, PHP, Ruby on Rails</div>
                    <div class="skill-item"><strong>Frontend:</strong> React, React Native</div>
                    <div class="skill-item"><strong>Cloud:</strong> AWS (ECS, S3, AppSync, CloudWatch)</div>
                    <div class="skill-item"><strong>Databases:</strong> DynamoDB, PostgreSQL, MongoDB, MySQL, SQLite</div>
                    <div class="skill-item"><strong>Tools:</strong> Git, Docker, VS Code, Postman</div>
                </div>
            `,
            "experience": `
                <h2>Professional Experience</h2>
                <div class="experience-container">
                    <div class="experience-item">
                        <h3>Lead Developer</h3>
                        <p>Arctic Research Foundation (2023 - 2025)</p>
                    </div>
                    <div class="experience-item">
                        <h3>Full-Stack Developer</h3>
                        <p>Arctic Research Foundation (2022 - 2023)</p>
                    </div>
                    <div class="experience-item">
                        <h3>Software Developer</h3>
                        <p>Community Revitalization Project (2022)</p>
                    </div>
                </div>
            `,
            "projects": `
                <h2>Highlighted Projects</h2>
                <div class="projects-container">
                    <div class="project-item">
                        <h3>Arctic Data Interoperability Framework</h3>
                        <p>Developed a scalable interoperability system for Arctic research datasets.</p>
                    </div>
                    <div class="project-item">
                        <h3>Custom Visualization Dashboard</h3>
                        <p>Created a powerful dashboard for visualizing complex research datasets.</p>
                    </div>
                </div>
            `,
            "contact": `
                <h2>Contact</h2>
                <p>Email: <a href="mailto:michaelkozubski@gmail.com">michaelkozubski@gmail.com</a></p>
                <p>LinkedIn: <a href="https://linkedin.com/in/michael-kozubski" target="_blank">linkedin.com/in/michael-kozubski</a></p>
            `
        };
        return pages[page] || `<h2>Page Not Found</h2>`;
    }

    // Function to load the selected page content
    window.loadPage = function(page) {
        document.getElementById("content").innerHTML = getPageContent(page);
        localStorage.setItem("lastPage", page); // Store the last visited page
    };

    // Load default page (About Me) on startup
    const lastPage = localStorage.getItem("lastPage") || "about";
    loadPage(lastPage);
});