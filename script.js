const form = document.getElementById('resultForm');
const rollInput = document.getElementById('roll');
const classSelect = document.getElementById('classSelect');
const rollError = document.getElementById('rollError');
const classError = document.getElementById('classError');

const loginSection = document.getElementById('loginSection');
const resultSection = document.getElementById('resultSection');

const API_URL = 'https://script.google.com/macros/s/AKfycbxiURlYg7FWIS58UFgDgGaHwjI73e3L17i_X_x2UgSOGoAxlkwQnOaqda0yiaiq83Wr/exec';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
}

function displayResult(data, roll, className) {
  if (!data || data.status !== 'found') {
    alert('রেজাল্ট পাওয়া যায়নি। দয়া করে সঠিক রোল এবং ক্লাস দিন।');
    showLogin();
    return;
  }

  document.getElementById('studentName').textContent = data.name || '';
  document.getElementById('fatherName').textContent = data.father || '';
  document.getElementById('rollNumber').textContent = roll || '';
  const classTextMap = { class6: '৬ষ্ঠ', class7: '৭ম', class8: '৮ম', class9: '৯ম', class10: '২য়' };
  document.getElementById('className').textContent = classTextMap[className] || '';
  document.getElementById('gender').textContent = data.gender || '';
  document.getElementById('dob').textContent = formatDate(data.dob);

  document.getElementById('mark1').textContent = data.mark1 || '';
  document.getElementById('gpa1').textContent = data.gpa1 || '';
  document.getElementById('mark2').textContent = data.mark2 || '';
  document.getElementById('gpa2').textContent = data.gpa2 || '';
  document.getElementById('mark3').textContent = data.mark3 || '';
  document.getElementById('gpa3').textContent = data.gpa3 || '';
  document.getElementById('mark4').textContent = data.mark4 || '';
  document.getElementById('gpa4').textContent = data.gpa4 || '';
  document.getElementById('totalGPA').textContent = data.totalGPA || '';

  showResult();
}

function showLogin() {
  loginSection.style.display = 'block';
  resultSection.style.display = 'none';
}

function showResult() {
  loginSection.style.display = 'none';
  resultSection.style.display = 'block';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  let valid = true;

  if (rollInput.value.trim() === '') {
    rollError.style.display = 'block';
    valid = false;
  } else {
    rollError.style.display = 'none';
  }

  if (classSelect.value === '') {
    classError.style.display = 'block';
    valid = false;
  } else {
    classError.style.display = 'none';
  }

  if (!valid) return;

  const roll = rollInput.value.trim();
  const className = classSelect.value;

  try {
    const res = await fetch(`${API_URL}?roll=${encodeURIComponent(roll)}&class=${encodeURIComponent(className)}`);
    const data = await res.json();
    displayResult(data, roll, className);
  } catch (error) {
    alert('রেজাল্ট আনার সময় সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    console.error(error);
  }
});

document.getElementById('backBtn').addEventListener('click', () => {
  showLogin();
});