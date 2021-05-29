
    const canvas = document.querySelector("#selector");
    canvas.width = 360;
    canvas.height = window.innerHeight - 73;
    const ctx = canvas.getContext("2d");
    const seats = this.state.seats;
    const canvasObjectModel = new Array();
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.lineWidth = 1;
    ctx.strokeStyle = "hsl(0, 0%, 10%)";
    for (let i = 0; i < seats.length; i++) {
        if (seats[i].reserved === true) {
            ctx.fillStyle = "hsl(0, 0%, 50%)";
            ctx.fillRect(seats[i].cords.x + (seats[i].cords.x * 35) + 2, seats[i].cords.y + (seats[i].cords.y * 35) + 2, 30, 30);
        }
        ctx.strokeRect(seats[i].cords.x + (seats[i].cords.x * 35) + 2, seats[i].cords.y + (seats[i].cords.y * 35) + 2, 30, 30);
        canvasObjectModel.push({
            id: seats[i].id,
            x: seats[i].cords.x + (seats[i].cords.x * 35) + 2,
            y: seats[i].cords.y + (seats[i].cords.y * 35) + 2,
            width: 30
        });
        console.log(canvasObjectModel);
    }