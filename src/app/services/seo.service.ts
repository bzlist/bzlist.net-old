import {Injectable} from "@angular/core";
import {Meta, Title} from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class SeoService {
  constructor(private meta: Meta,
              private titleService: Title){
  }

  generateTags(tags){
    tags = {
      title: "BZList",
      description: "",
      image: "https://bzlist.net/assets/images/icon/512.png",
      slug: "",
      ...tags
    }

    this.titleService.setTitle(tags.title);

    this.meta.addTags([
      {name: "description", content: tags.description},
      {name: "twitter:site", content: "BZList"},
      {name: "twitter:title", content: tags.title},
      {name: "twitter:description", content: tags.description},
      {name: "twitter:image", content: tags.image},
      {name: "og:type", content: "article"},
      {name: "og:site_name", content: "BZList"},
      {name: "og:title", content: tags.title},
      {name: "og:description", content: tags.description},
      {name: "og:image", content: tags.image},
      {name: "og:url", content: "https://bzlist.net"}
    ], true);
  }
}
