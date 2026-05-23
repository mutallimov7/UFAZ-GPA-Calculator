/* =======================
   MAIN CONTROLLER
======================= */
function Calculate() {
    const profession = document.body.querySelector("h1").innerText;

    let code;
    if (profession.includes("COMPUTER")) code = "CS";
    else if (profession.includes("CHEMICAL")) code = "CE";
    else if (profession.includes("CHEMISTRY")) code = "CH";
    else if (profession.includes("PETROLEUM")) code = "PE";
    else if (profession.includes("GEOPHYSICAL")) code = "GE";

    // BASIC SUBJECTS
    const math = Math2();
    const physicsArr = Physics2(); // [OWO, Lab]
    const phyAvg = (physicsArr[0] + physicsArr[1]) / 2;
    const french = French2();

    let output = `Mathematics 2: ${math.toFixed(3)}\nFrench 2: ${french.toFixed(3)}\nPhysics 2: ${phyAvg.toFixed(3)}\n  OWO: ${physicsArr[0].toFixed(3)}\n  Physics Lab: ${physicsArr[1].toFixed(3)}\n`;

    let gpa;

    switch (code) {
        case "CS": {
            const csGrades = CS2();
            const csAvg = avg(csGrades);

            output += `Computer Science 2: ${csAvg.toFixed(3)}\n`;
            output += `  Computer Architecture: ${csGrades[0].toFixed(3)}\n`;
            output += `  Databases: ${csGrades[1].toFixed(3)}\n`;
            output += `  OOP: ${csGrades[2].toFixed(3)}\n`;
            output += `  Cryptography: ${csGrades[3].toFixed(3)}\n`;
            output += `  Network Algorithms: ${csGrades[4].toFixed(3)}\n`;

            gpa = (6 * math + 6 * phyAvg + 3 * french + 15 * csAvg) / 30;
            break;
        }

        case "CE":
        case "CH": {
            const chemArr = Chemistry2(); // [AOM, TOM, Lab]
            const chemAvg = avg(chemArr);
            const ceArr = CE2(); // [HT, PD, MS]
            const ceAvg = avg(ceArr);

            output += `Chemistry 2: ${chemAvg.toFixed(3)}\n  AOM 2: ${chemArr[0].toFixed(3)}\n  TOM 2: ${chemArr[1].toFixed(3)}\n  Chemistry Lab: ${chemArr[2].toFixed(3)}\n`;
            output += `CE 2: ${ceAvg.toFixed(3)}\n  Heat Transfer: ${ceArr[0].toFixed(3)}\n  Process Diagram: ${ceArr[1].toFixed(3)}\n  Material Science for CE: ${ceArr[2].toFixed(3)}\n`;

            gpa = (6 * math + 6 * phyAvg + 3 * french + 9 * chemAvg + 6 * ceAvg) / 30;
            break;
        }

        case "GE": {
            const chemArr = Chemistry2PE(); // [AOM, TOM]
            const chemAvg = avg(chemArr);
            const geoArr = Geosciences2(); // [GI, MPBlock, PT]
            const geoAvg = (geoArr[0] + 2 * geoArr[1] + geoArr[2]) / 4;

            output += `Chemistry 2: ${chemAvg.toFixed(3)}\n  AOM 2: ${chemArr[0].toFixed(3)}\n  TOM 2: ${chemArr[1].toFixed(3)}\n`;
            output += `Geosciences 2: ${geoAvg.toFixed(3)}\n  Gravimetry & Isostacy: ${geoArr[0].toFixed(3)}\n  Mineralogy & Petrology: ${geoArr[1].toFixed(3)}\n  Plate Tectonics: ${geoArr[2].toFixed(3)}\n`;

            gpa = (6 * math + 6 * phyAvg + 3 * french + 6 * chemAvg + 9 * geoAvg) / 30;
            break;
        }

        case "PE": {
            const chemArr = Chemistry2PE(); // [AOM, TOM]
            const chemAvg = avg(chemArr);
            const geoArr = GeosciencesPE(); // [MPBlock, PT]
            const geoAvg = (2 * geoArr[0] + geoArr[1]) / 3;
            const pe2 = +document.querySelector(".PEFinal").value;

            output += `Chemistry 2: ${chemAvg.toFixed(3)}\n  AOM 2: ${chemArr[0].toFixed(3)}\n  TOM 2: ${chemArr[1].toFixed(3)}\n`;
            output += `Geosciences 2: ${geoAvg.toFixed(3)}\n  Mineralogy & Petrology: ${geoArr[0].toFixed(3)}\n  Plate Tectonics: ${geoArr[1].toFixed(3)}\n`;
            output += `PE 2: ${pe2.toFixed(3)}\n`;

            gpa = (6 * math + 6 * phyAvg + 3 * french + 6 * chemAvg + 6.75 * geoAvg + 2.25 * pe2) / 30;
            break;
        }
    }
    output += `\nL1S2 GPA: ${gpa.toFixed(3)}`;
    document.getElementById("myResult").innerText = output;

    // Example: redirect to a site after calculation
    // window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}

/* =======================
   HELPER FUNCTIONS
======================= */

function goTo(prof) {
    switch(prof) {
        case 'cs': window.location.href = 'L1_S2_For_CS.html'; break;
        case 'ce': window.location.href = 'L1_S2_For_CE.html'; break;
        case 'ch': window.location.href = 'L1_S2_For_CH.html'; break;
        case 'pe': window.location.href = 'L1_S2_For_PE.html'; break;
        case 'ge': window.location.href = 'L1_S2_For_GE.html'; break;
    }
}

function avg(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function Math2() {
    const p = +document.querySelector(".MathNotebook").value;
    const m = +document.querySelector(".MathMidterm").value;
    const f = +document.querySelector(".MathFinal").value;
    return (p + 2 * m + 3 * f) / 6;
}

function Physics2() {
    const o1 = +document.querySelector(".PhysicsFinal1").value;
    const o2 = +document.querySelector(".PhysicsFinal2").value;
    const o3 = +document.querySelector(".PhysicsFinal3").value;
    const rep = +document.querySelector(".PhysicsFinal4").value;
    const pw = +document.querySelector(".PhysicsFinal5").value;

    const owo = (o1 + o2 + o3) / 3;
    const lab = (2 * rep + pw) / 3;

    return [owo, lab];
}

function French2() {
    const m = +document.querySelector(".LangMidterm").value;
    const s = +document.querySelector(".LangSpeaking").value;
    const f = +document.querySelector(".LangFinal").value;
    return (2 * m + 3 * s + 3 * f) / 8;
}

function CS2() {
    const ca = 0.5 * +document.querySelector(".PWP").value + 0.5 * +document.querySelector(".CAFinal").value;
    const db = 0.1 * +document.querySelector(".PartPW").value + 0.4 * +document.querySelector(".PW").value + 0.5 * +document.querySelector(".CSFinal").value;
    const oop = 0.5 * +document.querySelector(".OOPPW").value + 0.5 * +document.querySelector(".OOPFinal").value;
    const cr = 0.5 * +document.querySelector(".CPWP").value + 0.5 * +document.querySelector(".CFinal").value;
    const na = 0.5 * +document.querySelector(".NAPWP").value + 0.5 * +document.querySelector(".NAFinal").value;
    return [ca, db, oop, cr, na];
}

function Chemistry2() {
    const aom = (+document.querySelector(".ChemMidterm").value + 2 * +document.querySelector(".ChemFinal").value) / 3;
    const tom = (+document.querySelector(".ChemMidtermT").value + 2 * +document.querySelector(".ChemFinalT").value) / 3;
    const lab = (2 * +document.querySelector(".Reports").value + +document.querySelector(".PWB").value) / 3;
    return [aom, tom, lab];
}

function Chemistry2PE() {
    const aom = (+document.querySelector(".ChemMidterm").value + 2 * +document.querySelector(".ChemFinal").value) / 3;
    const tom = (+document.querySelector(".ChemMidtermT").value + 2 * +document.querySelector(".ChemFinalT").value) / 3;
    return [aom, tom];
}

function CE2() {
    const ht = (+document.querySelector(".CEMidterm").value + 2 * (+document.querySelector(".CEFinal").value)) / 3;
    const pd = (2 * +document.querySelector(".CEHW").value + 3 * (+document.querySelector(".CEFinal2").value)) / 5;
    const ms = +document.querySelector(".CEFinal3").value;
    return [ht, pd, ms];
}

function Geosciences2() {
    const gi = +document.querySelector(".GiFinal").value;
    const pt = +document.querySelector(".PtFinal").value;
    const mpr = +document.querySelector(".MR").value;
    const mp = +document.querySelector(".MPFinal").value;
    const mpBlock = (mpr + 2 * mp) / 3;
    return [gi, mpBlock, pt];
}

function GeosciencesPE() {
    const pt = +document.querySelector(".PtFinal").value;
    const mpr = +document.querySelector(".MR").value;
    const mp = +document.querySelector(".MPFinal").value;
    const mpBlock = (mpr + 2 * mp) / 3;
    return [mpBlock, pt];
}
