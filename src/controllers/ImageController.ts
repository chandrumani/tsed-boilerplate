import {BodyParams, Controller, Get, MultipartFile, PlatformMulterFile, Post, Response} from "@tsed/common";
import { ServerResponse } from "http";
import fs from 'fs';

@Controller("/image")
export class ImageController {
  @Get("/")
  get() {
    return "hello";
  }

  @Post("/")
  post(
    @BodyParams('name') name:string
  ) {
    return name;
  }

  @Post("/upload")
  upload(
    @MultipartFile('file') file: PlatformMulterFile,
    @Response() response: ServerResponse,
  ) {
    try{
      response.writeHead(200, {
        'Content-type': file.mimetype,
        'Content-Disposition': `inline; filename="${encodeURIComponent(file.originalname)}"`,
      });
      response.end(fs.readFileSync(`${file.path}`));
    } catch (err){
      console.log(err);
    }
  }
}
