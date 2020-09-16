use neon::prelude::*;

mod meme;

fn build_meme(mut cx: FunctionContext) -> JsResult<JsArrayBuffer> {
    let image: Handle<JsArrayBuffer> = cx.argument(0)?;
    let top: Handle<JsString> = cx.argument(1)?;
    let bottom: Handle<JsString> = cx.argument(2)?;
    let result: Handle<JsArrayBuffer> = meme::gen(&mut cx, image, top, bottom)?;
    Ok(result)
}

register_module!(mut cx, {
    cx.export_function("buildMeme", build_meme)?;
    Ok(())
});
