const chatForm = get('form');
const chatInput = get('input');
const chatBox = get('main');


chatForm.addEventListener('submit', event => {
  event.preventDefault();
  const text = chatInput.value;
  if (!text) return;
  
  appendMessage('user', text);
  chatInput.value = '';
  query({
      "inputs": "how big is the world",
      "parameters": {}
  }).then((response) => {
    t = JSON.stringify(response)
    t2 = ""
    flag = true
    for (let i = 0; i < t.length; i++) {
      if (i > 35){
        if (t[i] == "\\"){
          flag = false
        }
        if (flag == true){
          t2 = t2.concat(t[i])
        }
      }
    }
    
    appendMessage('bot', t2);
    console.log(t2)
  });

  
  
});

function appendMessage(side, text) {
  const bubble = `
    <div class="msg -${side}">
        <div class="bubble">${text}</div>
    </div>`;
  chatBox.insertAdjacentHTML('beforeend', bubble);
  chatBox.scrollTop += 500;
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

async function query(data) {
	const response = await fetch(
		"https://xevhza5rhd1jhkq8.us-east-1.aws.endpoints.huggingface.cloud",
		{
			headers: { 
				"Accept" : "application/json",
				"Content-Type": "application/json" 
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}


