function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

let map = document.querySelector(".map"),
    treasure = document.querySelector(".treasure"),
    styles_map = window.getComputedStyle(map),  // стилі бекграунд картинки
    styles_treasure = window.getComputedStyle(treasure), // стилі картинки скарба
    width = parseInt(styles_map.getPropertyValue('width').toString()),
    height = parseInt(styles_map.getPropertyValue('height').toString()),
    width_treasure = parseInt(styles_treasure.getPropertyValue('width').toString()),
    height_treasure = parseInt(styles_treasure.getPropertyValue('height').toString()),
    indentation_left = map.getBoundingClientRect().left, // відступ до елемента по x
    indentation_top = map.getBoundingClientRect().top, // відступ до елемента по y
    treasure_x = rand(0, width - width_treasure),
    treasure_y = rand(0, height - height_treasure),
    approach = 0 // спроби

treasure.style.left = treasure_x + "px"
treasure.style.top = treasure_y + "px"

map.addEventListener('click', function(event) { // визначаємо координати кліка курсора
    let cursor_x = parseInt(event.clientX - indentation_left),
        cursor_y = parseInt(event.clientY - indentation_top)

    approach++
    console.log(approach)
    
    if (approach <= 10) {
        if(cursor_x >= treasure_x - 50 && cursor_x <= treasure_x + width_treasure + 50 && cursor_y >= treasure_y - 50 && cursor_y <= treasure_y + height_treasure + 50) {
            treasure.style.display = "block"
            alert("Вітаю! Ви знайшли скарб!!!")
        } else {
            if (approach === 10) {
                alert("На цьому острові скарбів нема :(")
            } else {
                alert("Тут скарба нема, пірат тебе обманув.")
            }
            // alert(cursor_x + " " + cursor_y)
        }
    }
})