const bg1 = document.getElementById('bgColor-1');
const bg2 = document.getElementById('bgColor-2');
const bg3 = document.getElementById('bgColor-3');
const blur = document.querySelector('.blur');
document.querySelector('#bgChange').addEventListener('click', function() {
    blur.style.background = `linear-gradient(90deg, ${bg1.value} 14%, ${bg2.value} 47%, ${bg3.value} 100%)`;
})
if ($(window).width() <= 650) {
    document.querySelector('#bgChange').addEventListener('click', function() {
        blur.style.background = `linear-gradient(180deg, ${bg1.value} 14%, ${bg2.value} 47%, ${bg3.value} 100%)`;
    })
}