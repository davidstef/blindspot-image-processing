import { resizeImage } from '../src/services/image-resize';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
import { Image } from '../src/models/image.model';
import { getImgMetadataFromBuffer } from '../src/services/image-reader';

const IMG_DIR = process.env.IMG_DIR || 'images';
const ROOT_FOLDER = process.cwd();
const IMG_PATH = path.join(ROOT_FOLDER, IMG_DIR);

describe('Tests for resizeImage function', () => {
  let testImage: Buffer;

  beforeAll(async () => {
    // create the 'images' directory if not exists
    fs.mkdir(IMG_PATH, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error trying to create directory: ${err.message}!`);
      } else {
        console.log(`Directory created succcessfully: ${IMG_PATH}!`);
      }
    })

    const imageName = 'test.jpeg';

    try {
      testImage = await sharp({
        create: {
          width: 0,
          height: 0,
          channels: 3,
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        }
      }).toBuffer();
  
      fs.writeFileSync(`${IMG_PATH}/${imageName}`, testImage);
  
      console.log(`Empty image created and saved as ${`${IMG_PATH}/${imageName}`}`);
    } catch (error: any) {
      console.error(`Error creating empty image: ${error.message}`);
    }
  });

  it('Should return a valid resized image', async () => {
    const name = 'toa.jpeg';
    const resolution = '100x100';
    const image = { name, resolution } as Image;
    const imageBuffer = await resizeImage(image);
   
    const imgMetadata = await getImgMetadataFromBuffer(imageBuffer || testImage);
    console.log('Resized Image Resolution:', `${imgMetadata.width}x${imgMetadata.height}`)

    expect(`${imgMetadata.width}x${imgMetadata.height}`).toEqual(resolution);
    expect(imageBuffer).not.toBeNull();
    expect(imageBuffer).toBeInstanceOf(Buffer);
  });

  it('Should return null for a non-existent image', async () => {
    const name = 'non-existent.jpg';
    const resolution = '100x100';
    const image = { name, resolution } as Image;

    const resizedImage = await resizeImage(image);

    expect(resizedImage).toBeNull();
  });

  it('Should return null for an invalid resolution', async () => {
    const name = 'test.jpeg';
    const resolution = 'invalid';
    const image = { name, resolution } as Image;

    const resizedImage = await resizeImage(image);

    expect(resizedImage).toBeNull();
  });

  it('Should return null for a missing resolution', async () => {
    const name = 'test.jpeg';
    const resolution = '';
    const image = { name, resolution } as Image;

    const resizedImage = await resizeImage(image);

    expect(resizedImage).toBeNull();
  });

  it('Should return null for a negative resolution', async () => {
    const name = 'test.jpeg';
    const resolution = '-100x-100';
    const image = { name, resolution } as Image;

    const resizedImage = await resizeImage(image);

    expect(resizedImage).toBeNull();
  });

  it('Should return null for a resolution with invalid values', async () => {
    const name = 'test.jpeg';
    const resolution = 'invalidxinvalid';
    const image = { name, resolution } as Image;

    const resizedImage = await resizeImage(image);

    expect(resizedImage).toBeNull();
  });
});
