  let blockCounter = 1;

  function addBlock() {
    blockCounter++;

    const blocksContainer = document.getElementById('blocksContainer');

    const newBlock = document.createElement('div');
    newBlock.classList.add('block');

    const label1 = document.createElement('label');
    label1.textContent = `Project Name:`;
    label1.setAttribute('for', `text${blockCounter}`);

    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.id = `pname${blockCounter}`;
    input1.classList.add('text-field');

    const label2 = document.createElement('label');
    label2.textContent = `Project Description:`;
    label2.setAttribute('for', `text${blockCounter}`);

    const input2 = document.createElement('input');
    input2.type = 'text';
    input2.id = `pdis${blockCounter}`;
    input2.classList.add('text-field');

    const labelPhoto = document.createElement('label');
    labelPhoto.textContent = `Photo of your project:`;
    labelPhoto.setAttribute('for', `photo${blockCounter}`);

    const photoInput = document.createElement('input');
    photoInput.type = 'file';
    photoInput.id = `photo${blockCounter}`;
    photoInput.classList.add('photo-input');

    newBlock.appendChild(label1);
    newBlock.appendChild(input1);
    newBlock.appendChild(document.createElement('br'));
    newBlock.appendChild(label2);
    newBlock.appendChild(input2);
    newBlock.appendChild(document.createElement('br'));
    newBlock.appendChild(labelPhoto);
    newBlock.appendChild(photoInput);

    blocksContainer.appendChild(newBlock);
  }

  function removeBlock() {
    const blocksContainer = document.getElementById('blocksContainer');
    const blocks = document.querySelectorAll('.block');

    if (blocks.length > 1) {
      blocksContainer.removeChild(blocks[blocks.length - 1]);
      blockCounter--;
    }
  }
