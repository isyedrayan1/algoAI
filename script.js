document.addEventListener("DOMContentLoaded", function () {
    let typingText = "Write your query...";
    let index = 0;
    let typingElement = document.getElementById("typing-text");

    function typeEffect() {
        if (index < typingText.length) {
            typingElement.innerHTML += typingText.charAt(index);
            index++;
            setTimeout(typeEffect, 100);
        }
    }
    typeEffect();

    const startBtn = document.getElementById("startBtn");
    const queryInput = document.getElementById("queryInput");
    const algorithmSection = document.querySelector(".algorithm-section");
    const codeSection = document.querySelector(".code-section");
    const progressBar = document.querySelector(".progress");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const algorithmSteps = {
        "bubble sort": [
            { step: "Step 1: Start", syntax: "Define function", code: "def bubble_sort(arr):" },
            { step: "Step 2: Loop through elements", syntax: "Use nested loops", code: "for i in range(len(arr)-1):" },
            { step: "Step 3: Swap if needed", syntax: "Check conditions", code: "if arr[j] > arr[j+1]: swap()" },
            { step: "Step 4: End", syntax: "Return sorted array", code: "return arr" }
        ],
        "binary search": [
            { step: "Step 1: Start", syntax: "Define function", code: "def binary_search(arr, target):" },
            { step: "Step 2: Set bounds", syntax: "Define low & high", code: "low, high = 0, len(arr) - 1" },
            { step: "Step 3: Loop until found", syntax: "Check middle element", code: "while low <= high:" },
            { step: "Step 4: End", syntax: "Return index or -1", code: "return mid if found else -1" }
        ]
    };

    let currentSteps = [];
    let currentStep = 0;

    function startAlgorithm() {
        let query = queryInput.value.trim().toLowerCase();
        if (query in algorithmSteps) {
            currentSteps = algorithmSteps[query];
            currentStep = 0;
            algorithmSection.classList.remove("hidden");
            showStep();
        } else {
            alert("Algorithm not found. Try 'Bubble Sort' or 'Binary Search'.");
        }
    }

    startBtn.addEventListener("click", startAlgorithm);
    queryInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            startAlgorithm();
        }
    });

    function showStep() {
        document.getElementById("algorithmText").innerHTML = currentSteps[currentStep].step;
        document.getElementById("syntaxText").innerHTML = currentSteps[currentStep].syntax;
        progressBar.style.width = `${(currentStep + 1) / currentSteps.length * 100}%`;

        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === currentSteps.length - 1;

        if (currentStep === currentSteps.length - 1) {
            setTimeout(() => {
                codeSection.classList.remove("hidden");
                document.getElementById("codeBox").innerText = currentSteps.map(s => s.code).join("\n");
            }, 500);
        } else {
            codeSection.classList.add("hidden");
        }
    }

    nextBtn.addEventListener("click", () => {
        if (currentStep < currentSteps.length - 1) {
            currentStep++;
            showStep();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            showStep();
        }
    });

    document.getElementById("tryCodeBtn").addEventListener("click", () => {
        navigator.clipboard.writeText(document.getElementById("codeBox").innerText).then(() => {
            alert("Code copied! Now paste it in the Programiz compiler.");
            window.open("https://www.programiz.com/python-programming/online-compiler", "_blank");
        }).catch(err => {
            alert("Failed to copy code. Please copy manually.");
        });
    });
});
