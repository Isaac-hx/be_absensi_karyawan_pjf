<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/dimas-ananda-riyadi/)



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Isaac-hx/be_absensi_karyawan_pjf">
    <img src="https://www.appsheet.com:443/fsimage.png?appid=17e0bb7a-a537-420f-af51-187d6b91acd3&datasource=google&filename=DocId%3D11dr6cJPOOmbu7P7nnZss_hfLnXcI4BFP&signature=421a0cb31d0018472a0042cffc99ec6275f59a764299d7273d043f05e01d2272&tableprovider=google&userid=982101234" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Webservice Pelita Jaya Food</h3>

  <p align="center">
   Web service app Pelita Jaya Food is used for apps for application absensi.
    <br />
    <a href="https://github.com/Isaac-hx/be_absensi_karyawan_pjfe"><strong>Explore the docs »</strong></a>

  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Pelita Jaya Food is a web-based application designed to streamline attendance management for organizations and businesses. This innovative platform offers robust features to ensure accurate and efficient tracking of employee attendance. Tailored for the food industry, the application addresses unique operational needs, including shift-based scheduling, location-based check-ins, and real-time attendance monitoring

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* Express.js
* Mysql
* Node.js


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

# API Endpoints Documentation

This document provides an overview of the available API endpoints for managing absensi, karyawan, and user data.  
All endpoints support optional query parameters for pagination:  

- `limit` (integer): Number of records to retrieve per page.  
- `page` (integer): Page number to retrieve (starting from 1).  
- `offset` (integer): Offset of records to skip (overrides `page` if provided)
- `order` (ASC/DESC): sort data by ASC or DESC

---
BASE_URL= http://localhost:3000/

## **Absensi Endpoints**

| Method | Endpoint         | Description                          | Query Parameters             |
|--------|------------------|--------------------------------------|------------------------------|
| GET    | `/absensi`       | Get all absensi records              | `limit`, `page`, `offset`,`order`    |
| GET    | `/absensi/:id`   | Get a specific absensi by ID         | -                            |
| POST   | `/absensi`       | Create a new absensi record          | -                            |

---

## **Karyawan Endpoints**

| Method | Endpoint             | Description                          | Query Parameters             |
|--------|----------------------|--------------------------------------|------------------------------|
| GET    | `/karyawan/total-karyawan` | Get total number of karyawan        | -                            |
| GET    | `/karyawan`          | Get all karyawan records             | `limit`, `page`, `offset`    |
| GET    | `/karyawan/:id`      | Get a specific karyawan by ID        | -                            |
| POST   | `/karyawan`          | Create a new karyawan record         | -                            |
| DELETE | `/karyawan/:id`      | Delete a karyawan record by ID       | -                            |
| PUT    | `/karyawan/:id`      | Update a karyawan record by ID       | -                            |

---

## **User Endpoints**

| Method | Endpoint             | Description                          | Query Parameters             |
|--------|----------------------|--------------------------------------|------------------------------|
| GET    | `/users/total-user`  | Get total number of users            | -                            |
| GET    | `/users`             | Get all user records                 | `limit`, `page`, `offset`    |
| GET    | `/users/:id`         | Get a specific user by ID            | -                            |
| POST   | `/users/register`    | Register a new user                  | -                            |
| POST   | `/users/login`       | Login an existing user               | -                            |
| DELETE | `/users/:id`         | Delete a user record by ID           | -                            |
| PUT    | `/users/:id`         | Update a user record by ID           | -                            |

---

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* Install node.js 
* Edit file .env with your credentials
* Create database MYSQL
* Generate MYSQL Database with file absensi.sql



### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/Isaac-hx/be_absensi_karyawan_pjf
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the serve and access to http://localhost:3000 
    ```sh
    npm run dev
    ```



<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

Dimas Ananda Riyadi - dimasanandariyadi@gmail.com

Project Link: [https://github.com/be_absensi_karyawan_pjf](https://github.com/Isaac-hx/be_absensi_karyawan_pjf)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [NPM](http://npmjs.com/)
* [Excalidraw](https://excalidraw.com/)
* [DBdiagram](https://dbdiagram.io/)
* [ChatGPT](https://chatgpt.com/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 