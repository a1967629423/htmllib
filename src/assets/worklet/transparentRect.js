class TR{
    paint(ctx,size,propertise){
        const color = propertise.get('--rect-color')
        ctx.fillStyle = color.cssText;
        ctx.fillRect(0,0,size.width,size.height);
    }
}
registerPaint('simpleRect',TR);