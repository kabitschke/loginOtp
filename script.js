let otp = [];

function updateOTP() {
  for (let q = 0; q < 6; q++) {
    inputs[q].value = otp[q] !== undefined ? otp[q] : '';
  }
  if (otp.length < 6) {
    inputs[otp.length].focus();
  }
}

function handleInput(event) {
  const inputValue = event.target.value;
  const index = Array.from(inputs).indexOf(event.target);

  // Se o valor for um número, atualiza o array otp
  if (inputValue && !isNaN(inputValue)) {
    otp[index] = parseInt(inputValue);
    if (index < 5) {
      inputs[index + 1].focus();
    }
  } else {
    otp[index] = undefined; // Se o campo for limpo, define como undefined
  }

  // Se o campo estiver vazio e Backspace foi pressionado, remove o último elemento
  if (inputValue === '' && event.inputType === 'deleteContentBackward') {
    otp.pop();
  }

  updateOTP();
}

function handlePaste(event) {
  event.preventDefault();
  const pasteContent = event.clipboardData.getData('text').trim();
  for (let i = 0; i < pasteContent.length; i++) {
    if (i < 6) {
      const num = parseInt(pasteContent[i]);
      if (!isNaN(num)) {
        otp[i] = num; // Preenche diretamente na posição correspondente
      }
    }
  }
  updateOTP();
}

let inputs = document.querySelectorAll('.otp-area input');
inputs.forEach((input, index) => {
  input.addEventListener('input', handleInput);
  input.addEventListener('keydown', (event) => {
    // Se for Backspace e o campo estiver vazio, remove o último dígito
    if (event.key === 'Backspace' && input.value === '') {
      otp.pop();
      updateOTP();
    }
  });
});

inputs[0].addEventListener('paste', handlePaste);
updateOTP();
