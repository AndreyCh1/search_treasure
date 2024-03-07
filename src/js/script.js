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
    approach = 0, // спроби
    isApproach = true,
    arrow = document.querySelector(".arrow"),
    restart = document.querySelector(".restart")

treasure.style.left = treasure_x + "px"
treasure.style.top = treasure_y + "px"

function getDistanceBetweenPoints(x1, y1, x2, y2) {
    // Розрахунок різниці координат
    const dx = x2 - x1;
    const dy = y2 - y1;
  
    // Використання теореми Піфагора
    const distance = Math.sqrt(dx * dx + dy * dy);
  
    // Повернення відстані
    return distance;
}

function getAngleBetweenPoints(point1, point2) {
    // Обчислення різниці координат
    let dx = point2.x - point1.x;
    let dy = point2.y - point1.y;
  
    // Обчислення тангенса кута
    let tanTheta = dy / dx;
  
    // Перетворення тангенса в радіани
    let thetaRadians = Math.atan(tanTheta);
  
    // Перетворення радіанів в градуси
    let thetaDegrees = thetaRadians * 180 / Math.PI;
  
    // Корекція кута для негативних значень dx
    if (dx < 0) {
      thetaDegrees += 180;
    }
  
    // Повернення градусної міри кута
    return thetaDegrees + 180
}

map.addEventListener('click', function(event) { // визначаємо координати кліка курсора
    if (isApproach) {
        let cursor_x = parseInt(event.clientX - indentation_left),
            cursor_y = parseInt(event.clientY - indentation_top)
    
        approach++
        console.log(approach)
        
        
        if (approach <= 10) {
            if(cursor_x >= treasure_x - 50 && cursor_x <= treasure_x + width_treasure + 50 && cursor_y >= treasure_y - 50 && cursor_y <= treasure_y + height_treasure + 50) { // визначаємо чи попав клік в зону скарба
                treasure.style.display = "block"
                arrow.style.display = "none"
                isApproach = false
                alert("Вітаю! Ви знайшли скарб!!!")
                restart.style.display = "block"
                restart.addEventListener('click', function() {
                    location.reload()
                })
            } else {
                if (approach === 10) {
                    isApproach = false
                    alert("На цьому острові скарбів нема :(")
                    restart.style.display = "block"
                    restart.addEventListener('click', function() {
                        isApproach = true
                    })
                } else {
                    arrow.style.top = cursor_y + "px"
                    arrow.style.left = cursor_x + "px"
                    arrow.style.display = "block"
                    arrow.style.transform = "rotate(" + getAngleBetweenPoints({x: cursor_x, y: cursor_y}, {x: treasure_x, y: treasure_y}) + "deg)"
                    alert("Тут скарба нема, пірат тебе обманув. Відстань до скарбу " + Math.floor(getDistanceBetweenPoints(cursor_x, cursor_y, treasure_x, treasure_y)) + "px")
                }
                // alert(cursor_x + " " + cursor_y)
            }
        }
    }
})