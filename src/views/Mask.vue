<template>
    <div class="mask-container">
        <div class="outline container">
            <div class="instance"></div>
        </div>
        <div class="boxshadow container">
            <div class="instance"></div>
        </div>
        <div class="mask container">
            <div class="instance"></div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.mask-container{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: auto;
    overflow-y: hidden;
    scroll-snap-points-x: repeat(100%);
    scroll-snap-type: mandatory;
    .container{
        width: 100%;
        height: 100%;
        flex:none;
        box-sizing: border-box;
        display: flex;
        background-image: url('../assets/bg.jpeg');
        background-size:cover;
        background-repeat: no-repeat;
        margin: 0 10px;
        .instance{
            width: 100px;
            height: 100px;
            margin: auto;
            background-color: rgba($color: #000000, $alpha: .2);
            overflow: hidden;
        }
        &.outline{
            .instance{
                
                outline: rgba($color: #000000, $alpha: .6) solid 719px ;
            }
            z-index: 5;
        }
        &.boxshadow{
            .instance{
                width: 180px;
                border-radius: 50%;
                box-shadow: 0 0 0 1000px rgba($color: #000000, $alpha: .6);
            }
        }
        &.mask{
            .instance{
                margin: 0;
                width: 100%;
                height: 100%;
                background-color: rgba($color: #000000, $alpha: .6);
                mask:  center center ;
                mask-repeat: no-repeat;
                mask-image: linear-gradient(black,black), url("../assets/start.svg");
                mask-size: cover,120px 120px;
                mask-composite: exclude;
                mask-composite: source-out;
            }
        }
    }
    
}
</style>