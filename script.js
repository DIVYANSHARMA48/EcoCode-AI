// EcoCode AI performs a few simple text checks. It is intentionally easy to read and extend.
const codeInput = document.getElementById("codeInput");
const analyzeButton = document.getElementById("analyzeButton");
const suggestionsBox = document.getElementById("suggestions");
const scoreElement = document.getElementById("score");
const scoreLabel = document.getElementById("scoreLabel");
const scoreMessage = document.getElementById("scoreMessage");
const issueCount = document.getElementById("issueCount");
const scoreRing = document.getElementById("scoreRing");
const scoreProgress = document.getElementById("scoreProgress");

function analyzeCode() {
  const code = codeInput.value;
  const issues = [];

  // Two consecutive lines that begin with 'for' are treated as a nested loop.
  const nestedLoop = /for\s*\([^)]*\)\s*\{?[\s\S]{0,250}?for\s*\([^)]*\)\s*\{?/i.test(code) || /(^|\n)\s*for\s+.+:\s*\n\s+for\s+.+:/m.test(code);
  if (nestedLoop) issues.push({ title: "Nested loops detected", text: "Nested loops can grow very expensive as data increases. Try using a lookup table, a single loop, or a more direct query.", points: 25, high: true });

  // This checks whether append( appears within the body of a for loop.
  const appendInLoop = /for\s*(?:\([^)]*\)|.+:)[\s\S]{0,350}?\.append\s*\(/i.test(code);
  if (appendInLoop) issues.push({ title: "append() inside a loop", text: "Repeatedly growing a list can use extra memory. When practical, build values first or use a list comprehension.", points: 15, high: false });

  // Wildcard imports load more than the program may need.
  if (/import\s+\*/i.test(code) || /from\s+\S+\s+import\s+\*/i.test(code)) {
    issues.push({ title: "Wildcard import found", text: "Import only the names you use. This reduces startup work and keeps dependencies clear.", points: 10, high: false });
  }

  let score = 100;
  issues.forEach(issue => score -= issue.points);
  score = Math.max(0, score);
  updateResults(issues, score);
}

function updateResults(issues, score) {
  scoreElement.textContent = score;
  issueCount.textContent = `${issues.length} issue${issues.length === 1 ? "" : "s"}`;
  suggestionsBox.innerHTML = "";

  if (issues.length === 0) {
    suggestionsBox.innerHTML = '<div class="empty-state"><span>🌱</span><p>No common energy concerns found. Nice, efficient work!</p></div>';
  } else {
    issues.forEach(issue => {
      const card = document.createElement("article");
      card.className = `suggestion ${issue.high ? "high" : ""}`;
      const icon = issue.high ? "⚠️" : "💡";
      card.innerHTML = `<h3><span>${icon}</span>${issue.title} <small>(-${issue.points})</small></h3><p>${issue.text}</p>`;
      suggestionsBox.appendChild(card);
    });
  }

  const rating = score >= 80 ? "Excellent" : score >= 55 ? "Good" : "Needs Improvement";
  scoreLabel.textContent = rating;
  scoreMessage.textContent = rating === "Excellent" ? "Your code is looking energy-efficient!" : rating === "Good" ? "A few refinements could make this code greener." : "Start with the suggestions above to reduce resource use.";
  scoreRing.style.borderColor = score >= 80 ? "#5bd66e" : score >= 55 ? "#f3b456" : "#ee7373";
  scoreElement.style.color = score >= 80 ? "#5bd66e" : score >= 55 ? "#f3b456" : "#ee7373";
  scoreProgress.style.width = `${score}%`;
  scoreProgress.style.background = score >= 80 ? "#5bd66e" : score >= 55 ? "#f3b456" : "#ee7373";
}

analyzeButton.addEventListener("click", analyzeCode);
