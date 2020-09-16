use neon::prelude::*;

use std::fs::File;
use std::io::{Read, Seek, SeekFrom};

use artano::{self, Annotation, Canvas, load_font};
use tempfile::tempfile;

pub(crate) fn gen<'a>(cx: &mut impl Context<'a>,
                      img: Handle<'a, JsArrayBuffer>,
                      top: Handle<'a, JsString>,
                      bottom: Handle<'a, JsString>) -> JsResult<'a, JsArrayBuffer>
{
    let top = top.value();
    let bottom = bottom.value();
    let mut tmp = cx.borrow(&img, |data| {
        gen_temp_file(data.as_slice(), &top, &bottom)
    });
    let mut result = cx.array_buffer(tmp.metadata().unwrap().len() as u32)?;
    cx.borrow_mut(&mut result, |data| {
        tmp.read_exact(data.as_mut_slice()).unwrap();
    });
    Ok(result)
}

fn gen_temp_file(img: &[u8], top: &str, bottom: &str) -> File {
    let mut canvas = Canvas::read_from_buffer(img).unwrap();
    let top = Annotation::top(&top.to_uppercase());
    let bottom = Annotation::bottom(&bottom.to_uppercase());
    let impact = load_font("Impact").unwrap();
    canvas.add_annotation(&top, &impact, 1.0);
    canvas.add_annotation(&bottom, &impact, 1.0);
    canvas.render();
    let mut tmp = tempfile().unwrap();
    canvas.save_jpg(&mut tmp).unwrap();
    tmp.seek(SeekFrom::Start(0)).unwrap();
    tmp
}
