function countVowels(name) {
    let vowels = "aeiou";
    return [...name.toLowerCase()].filter(char => vowels.includes(char)).length;
}

function countCommonLetters(name1, name2) {
    let set1 = new Set(name1.toLowerCase());
    let set2 = new Set(name2.toLowerCase());
    let commonCount = [...set1].filter(char => set2.has(char) && char >= 'a' && char <= 'z').length;
    return commonCount;
}

function calculateLove() {
    let name1 = document.getElementById("name1").value;
    let name2 = document.getElementById("name2").value;

    if (name1 === "" || name2 === "") {
        alert("Please enter both names");
        return;
    }

    let vowels1 = countVowels(name1);
    let vowels2 = countVowels(name2);
    let commonLetters = countCommonLetters(name1, name2);

    let totalLetters = name1.length + name2.length;
    let percentage = ((vowels1 + vowels2 + commonLetters) / totalLetters) * 100;

    document.getElementById("result").innerText = "Love Percentage: " + percentage.toFixed(2) + "%";

    saveToGoogleSheet(name1, name2);
}

function saveToGoogleSheet(name1, name2) {
    let formURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfCJrBtcZCu82qNTG5TBMNlxSXFGxrmwChQ0F2DYz2lP9Bszg/formResponse";
    let formData = new FormData();

    formData.append("entry.1449482728", name1);
    formData.append("entry.1650570362", name2);

    fetch(formURL, {
        method: "POST",
        body: formData,
        mode: "no-cors"
    }).then(() => console.log("Data submitted to Google Sheet"));
}