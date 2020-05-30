import { Request, Response } from "express";

class FooterController{
  static getAll = async (req: Request, res: Response) => {
    const footerContent = [
      { id: 1, section: '/', content: "WAT App 2019. All Rights Reserved"},
      { id: 2, section: '/contact-us', content: "We are just a few minutes away to reach you out....."},
      { id: 3, section: '/events', content: "We are proud of what we do, and we do what we are proud of....."},
      { id: 4, section: '/events-list', content: "We are proud of what we do, and we do what we are proud of....."},
      { id: 4, section: '/contributors', content: "Not just contributors, until today we never realized that we can be life changers...."},
      { id: 5, section: '/contributors/show', content: "You deserve the world, because you are changing it....."},
      { id: 6, section: 'funds', content: "Our success is not just measured by the numbers we contribute , it is measured by the number of people we reach out...."}
    ];
    res.send({ data: footerContent });
  };

}

export default FooterController;
