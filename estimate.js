const estimateForm = document.querySelector("#estimate");
const result = document.querySelector("#estimate-result");
const inputs = ["members", "share", "staff"].map(id => document.getElementById(id));
const packages = [
  { upTo: 30, monthlyPrice: 65 },
  { upTo: 100, monthlyPrice: 210 },
  { upTo: Infinity, monthlyPrice: 305 },
];
const numberFormat = new Intl.NumberFormat("zh-CN");

function updateEstimate() {
  if (inputs.some(input => !input.validity.valid)) {
    result.textContent = "请填写有效的整数，比例需在 0–100 之间。";
    return;
  }

  const [members, share, staff] = inputs.map(input => input.valueAsNumber);
  const peak = Math.ceil(members * share / 100) + staff;
  if (peak === 0) {
    result.textContent = "预计 0 人同时使用。请按实际营业时段的使用情况填写。";
    return;
  }

  const { monthlyPrice } = packages.find(option => peak <= option.upTo);
  const count = document.createElement("strong");
  count.textContent = `约 ${numberFormat.format(peak)} 人同时使用`;
  const summary = peak <= 100
    ? `店里不用留电脑开机，服务器租金约 ¥${monthlyPrice}/月。`
    : `服务器租金可从 ¥${monthlyPrice}/月估起，再按高峰时段的使用情况调整。`;
  result.replaceChildren(count, summary);
}

estimateForm.addEventListener("input", updateEstimate);
estimateForm.addEventListener("submit", event => event.preventDefault());
updateEstimate();
estimateForm.hidden = false;
