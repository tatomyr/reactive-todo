// Fake response
export const fakeRequest = () => new Promise(resolve => {
  const delay = Math.round(1000 * (Math.random() + Math.random() + Math.random()))
  setTimeout(() => {
  	resolve(delay)
  }, delay)
})

// Color highlighting or rerender
function getRandomColor(prefer = 'none') {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    const rnd = Math.random();
    const val = {
      'none': rnd * 16,
      'light': rnd * 6 + 10,
      'dark': rnd * 6,
    }
    color += letters[Math.floor(val[prefer])];
  }
  return color;
}

export const highlight = prefer => '' // `style="background-color: ${getRandomColor(prefer)};"`

// Set of images
export const images = [
  "https://images.unsplash.com/photo-1495198551082-4499d2dd5312?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fad723e4a048edea0afb17605e11a853&w=1000&q=80",
  "https://images.unsplash.com/photo-1512951670161-b5c6c632b00e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=60a7f1bd1496cc315e1c006fc53817b4&w=1000&q=80",
  "https://images.unsplash.com/photo-1521130527785-3dda1aae1bb3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=09e2ff2ea2604dfb1e4209948d0ae95a&w=1000&q=80",
  "https://images.unsplash.com/photo-1508768787810-6adc1f613514?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e27f6661df21ed17ab5355b28af8df4e&w=1000&q=80",
  "https://images.unsplash.com/photo-1515275929891-b6b1b1153aa4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0476d4ab69dd78840bbe8823f5fcd1ec&w=1000&q=80",
  "https://images.unsplash.com/photo-1499424271223-6e0ab6be9bd6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=60c285849b19cec273f9212c1c039bee&w=1000&q=80",
  "https://images.unsplash.com/photo-1511945288665-e89b53c0c604?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c2e755d3f836df222959aaa4712643fb&w=1000&q=80",
  "https://images.unsplash.com/photo-1513708726622-aefa716650bb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8662009f4c1407e8b39919d618a4fe7e&w=1000&q=80",
  "https://images.unsplash.com/photo-1516568760-88e3b6ed2653?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9b84fc35b4f07af2cc0ddee631e2838&w=1000&q=80",
  "https://images.unsplash.com/photo-1496361328949-40f91ca2fcef?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=01faa5d3f58a7b5999a664d2303a4815&w=1000&q=80",
  "https://images.unsplash.com/photo-1510775750777-c6a9f669e051?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=65402aac0954341173e9cefb81fe35a5&w=1000&q=80",
  "https://images.unsplash.com/photo-1516757932457-9233f965b8d8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=37c8569c54b9e9ee05072839b91bd643&w=1000&q=80",
  "https://images.unsplash.com/photo-1496935127680-16e7e9e5eba3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a2ece95cddc5ac4a95a1e9b8fbbe6a61&w=1000&q=80",
  "https://images.unsplash.com/photo-1503662071284-75e83cfa37de?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0cedc02833292f16cf302a02d796029e&w=1000&q=80",
  "https://images.unsplash.com/photo-1515864119557-22a6aa3b546b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=21dcecf09864055bd6f784c8e7781864&w=1000&q=80",
  "https://images.unsplash.com/photo-1499514694201-9e89bcba16c5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=14fa0571fb8d326c611e5aa87a5b843f&w=1000&q=80",
  "https://images.unsplash.com/photo-1501576003369-64f301d92efb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3d07dd3fb938d06b6dbae42c7eb0ab04&w=1000&q=80",
  "https://images.unsplash.com/photo-1513744985676-c7e80ee4d05e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=128327e18a701cdd23cc0ef797183ccb&w=1000&q=80",
  "https://images.unsplash.com/photo-1516072900265-351afd3a57f9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=30a21ec245c9c2c45d4981332feef3f0&w=1000&q=80",
  "https://images.unsplash.com/photo-1513659547044-0c60791d3243?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=07a012033d81c99257bccd0b2a37c82a&w=1000&q=80",
  "https://images.unsplash.com/photo-1514064019862-23e2a332a6a6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=87ffb8e2ae58c967f051b396c7faca63&w=1000&q=80",
  "https://images.unsplash.com/photo-1519255525298-1920dc710659?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1d778ad2830818cf96f6c6e6303e44ef&w=1000&q=80",
  "https://images.unsplash.com/photo-1508824956979-1c9a48af9c0c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2ae20feefdda8f45ecd5aaa8d74328ab&w=1000&q=80",
  "https://images.unsplash.com/photo-1510655150663-0c70ce372c88?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1b8e83ae3f28cbb2137fc2441e893156&w=1000&q=80",
  "https://images.unsplash.com/photo-1510941671406-5b6a901932fa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ef051786b948802da7e6bd2cda22a2bc&w=1000&q=80",
  "https://images.unsplash.com/photo-1521899148182-53d4f3becdbd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2ced20cb262180c3ff8509f4bddfe58b&w=1000&q=80",
  "https://images.unsplash.com/photo-1502787530428-11cf61d6ba18?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ee60964c06a30ae7596dce9f7380a391&w=1000&q=80",
  "https://images.unsplash.com/photo-1507215588762-466ec081014e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d2048d347432f52c5bed69c683f767b3&w=1000&q=80",
  "https://images.unsplash.com/photo-1515683359900-6922e4964be1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=87dd134f90a2487ec9f0d8ea633357cc&w=1000&q=80",
  "https://images.unsplash.com/photo-1518717733730-1e16ddc07f22?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4a4fa1c2f0b2574ba4c5f13118cd7502&w=1000&q=80",
  "https://images.unsplash.com/photo-1504465669713-b40b83b40eae?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dd83a7f71ce90316d3053b1c803ba561&w=1000&q=80",
  "https://images.unsplash.com/photo-1514832510016-108f38c20162?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dbb79afb2cb593a13ea63e3f4b393f95&w=1000&q=80",
  "https://images.unsplash.com/photo-1516010959786-8ac179510f0f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=17f7f067f360cd8cc2a75ea42ed91f79&w=1000&q=80",
  "https://images.unsplash.com/photo-1516290881724-2230498ea247?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a8e018b51e43bd6b19e8b7126943d1a4&w=1000&q=80",
  "https://images.unsplash.com/photo-1511189975737-b5939ef6a944?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8b6af19ba770980521cdd98c2c60eef1&w=1000&q=80",
  "https://images.unsplash.com/photo-1516447379291-16bee43e16ca?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=41f3f5a8ce195288a1d3060a4c8a58c0&w=1000&q=80",
  "https://images.unsplash.com/photo-1520507283041-1f2c1d54a781?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4ba2a3cd698943822fe960b6f4bff7f1&w=1000&q=80",
  "https://images.unsplash.com/photo-1510046651888-1be61805a114?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=231f12926b338b70673ea107b2c78ca3&w=1000&q=80",
  "https://images.unsplash.com/photo-1516046827393-be7eb3d379b9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=71a7e1ba58dfd30bf682b7fc2fed6a19&w=1000&q=80",
  "https://images.unsplash.com/photo-1517462889167-adbd2e3dd095?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=03094b083fdf716ef93d491579bc7d74&w=1000&q=80",
]
