document.body.onload = populateCards;

function populateCards() {
    let wrapper = document.getElementById("card-wrapper");
    const template = document.getElementById("card-template");

    fetch(
        "https://docs.google.com/spreadsheets/d/12mW65Q8qiocUZx35dbrHZdTvdfi9uRBzC1zeUGOybP0/gviz/tq?tqx=out:json&tq",
    )
        .then((response) => response.text())
        .then((text) => {
            const json = JSON.parse(text.substring(47).slice(0, -2));
            if (json.table.parsedNumHeaders == 0) {
                console.log("No submissions, presumably");
                let noSubmissionMsg = document.createElement("p");
                noSubmissionMsg.textContent = "No submissions (yet...)";
                wrapper.appendChild(noSubmissionMsg);
                return;
            }
            const result = json.table.rows.map((element) => {
                return {
                    date: element.c[0].v,
                    teamName: element.c[1].v,
                    description: element.c[2].v,
                    imgUrls: element.c[3].v
                        .split(", ")
                        .map((element) =>
                            element.replace(
                                /^https:\/\/drive.google.com\/open\?/,
                                "https://drive.google.com/thumbnail?",
                            ),
                        ),
                    track: element.c[5].v,
                };
            });
            for (let submission of result) {
                const clone = document.importNode(template.content, true);
                let imgSection = clone.querySelector("div.img-section");
                let textSection = clone.querySelector("div.text-section");

                let newImg = new Image();
                newImg.alt = "image";
                newImg.src = submission.imgUrls[0];
                newImg.onerror = () => {
                    newImg.src = "https://placehold.co/600";
                };

                let teamNameHeader = document.createElement("h5");
                teamNameHeader.textContent = submission.teamName;
                let trackHeader = document.createElement("h6");
                trackHeader.textContent = submission.track;
                let desc = document.createElement("p");
                desc.textContent = submission.description;
                textSection.appendChild(teamNameHeader);
                textSection.appendChild(trackHeader);
                textSection.appendChild(desc);
                imgSection.appendChild(newImg);
                wrapper.appendChild(clone);
            }
        });
}
