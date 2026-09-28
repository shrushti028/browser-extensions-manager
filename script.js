const cardsContainer = document.querySelector(".cards");

//Read data.json
fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        
        // Function to display cards
        function displayCards(extensions) {

            // Clear currently displayed cards 
            cardsContainer.innerHTML = "";

            extensions.forEach(extension => {

                const card = document.createElement("article");
                card.classList.add("card");
                cardsContainer.appendChild(card);

                //Top section
                const cardTop = document.createElement("div"); 
                cardTop.classList.add("top");

                //Logo 
                const cardImg = document.createElement("img");
                cardImg.src = extension.logo;

                //Name
                const cardName = document.createElement("h2");
                cardName.textContent = extension.name;

                //Description
                const cardDesc = document.createElement("p");
                cardDesc.textContent = extension.description;

                // Info section 
                const cardInfo = document.createElement("div"); 
                cardInfo.classList.add("info");

                card.appendChild(cardTop);
                cardTop.appendChild(cardInfo);
                cardInfo.appendChild(cardImg);
                cardInfo.appendChild(cardName);
                cardTop.appendChild(cardDesc);

                //Bottom section
                const cardBottom = document.createElement("div");
                cardBottom.classList.add("bottom");
                card.appendChild(cardBottom);

                //Remove button
                const removeButton = document.createElement("button");
                removeButton.classList.add("remove-btn");
                removeButton.textContent = "Remove";
                removeButton.addEventListener('click', function() {
                    data = data.filter(item => item.name !== extension.name);
                    card.remove();
                });
                cardBottom.appendChild(removeButton);

                 //Toggle 
                const cardToggle = document.createElement("label");
                cardToggle.classList.add("toggle");
                cardBottom.appendChild(cardToggle);

                //checkbox
                const toggleInput = document.createElement("input");
                toggleInput.type = 'checkbox';
                toggleInput.checked = extension.isActive;

                toggleInput.addEventListener("change", function() {
                    extension.isActive = toggleInput.checked;
                });

                cardToggle.appendChild(toggleInput);

                //Slider of toggle
                const toggleSlider = document.createElement("span");
                toggleSlider.classList.add('slider');
                cardToggle.appendChild(toggleSlider);

            });
        }

        // Display all cards initially 
        displayCards(data);


        //Filter buttons - All, Active, Inactive
        const filterButtons = document.querySelectorAll(".filters button");

        filterButtons.forEach(button => {

            button.addEventListener("click",function() {

                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove("active-filter");
                });

                // Add active class to the clicked button
                button.classList.add("active-filter");


                const activeExtensions = data.filter( 
                    extension => extension.isActive 
                );

                const inactiveExtensions = data.filter( 
                    extension => !extension.isActive 
                );

                const filter = button.textContent; 
              
                if(filter === "All") {
                    displayCards(data);
                }
                else if(filter === "Active") {
                    displayCards(activeExtensions);
                } 
                else {
                    displayCards(inactiveExtensions);
                }
            });
        });

        const themeButton = document.querySelector(".theme-btn");
        const themeIcon = document.querySelector(".theme-icon");
        const body = document.querySelector("body");
        themeButton.addEventListener("click", function() {
            body.classList.toggle("light-theme");

            if (body.classList.contains("light-theme")) {
                themeIcon.src = "./assets/images/icon-moon.svg";
            }
            else {
                themeIcon.src = "./assets/images/icon-sun.svg";
            }
        });
});