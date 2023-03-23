# Secret Santa
Secret Santa is a single-page web application built with React.js, React Hooks, CSS3, CSS Flexbox, Formik, and Axios. It allows users to participate in an anonymous gift exchange for the New Year. The application does not require any registration or user data, is optimized for any device, does not contain ads, and is completely free. <br>
**[URL](https://maximaslov.github.io/secret-santa/)**
<br>
The language of the application: Ukrainian.
***
## Instructions:

1. On the main screen, you can launch the application by selecting the Ukrainian language. The button for the Russian language will move away from you. You can also read these instructions on the main screen.
In the mobile version of the application, instead of selecting the language, there is a button that says "Почати" (Start).<br>


<p align="center">
  <img src="https://github.com/maximaslov/secret-santa/blob/main/src/img/for-readme/1-1.png" alt="">
</p>

### If the company has not been created yet:

2.  Click on the "Створити нову компаныю" (Create new company) button. <br>

<p align="center">
  <img src="https://github.com/maximaslov/secret-santa/blob/main/src/img/for-readme/1-2.png" alt="">
</p>

3.  Enter the number of participants, come up with a password, and click the "Далі" (Next) button. The number of participants cannot be less than three.

<p align="center">
  <img src="https://github.com/maximaslov/secret-santa/blob/main/src/img/for-readme/1-3.png" alt="">
</p>

4. In each field, enter the name of each participant. If you suddenly realize that you have entered the wrong number of participants, you have the option to remove an extra field or add a new one.

> **Note that names should not be repeated and should not contain errors. If there are participants in your list with the same names, agree with them that one will be registered as, for example, Dima, and the other as Dmitry.**

<p align="center">
  <img src="https://github.com/maximaslov/secret-santa/blob/main/src/img/for-readme/1-4.png" alt="">
</p>

5. Enter your name and click the "Стати таємним Сантою" (Become a secret Santa) button.

<p align="center">
  <img src="https://github.com/maximaslov/secret-santa/blob/main/src/img/for-readme/1-5.png" alt="">
</p>

6. After that, you will see the name of the person you will be giving a gift to, the list of participants, as well as the number and password of your company.

<p align="center">
  <img src="https://github.com/maximaslov/secret-santa/blob/main/src/img/for-readme/1-61.png" alt="">
</p>

7. Pass the number and password of your company to all participants on the list.

> **Please note that the participant must enter the name exactly as it is specified in the list. If the participant is registered under the name "Dmitry", he must enter exactly this name, not "Dima", "Dimon", "dmitry", and so on.**

### If the company has already been created:

1.  Enter the number and password of your company and click the "Далі" (Next) button.

<p align="center">
  <img src="https://github.com/maximaslov/secret-santa/blob/main/src/img/for-readme/2-1.png" alt="">
</p>

2. Enter your name exactly as it was specified by the person who created the list of participants, and click the "Стати таємним Сантою".  (Become a Secret Santa) button.

<p align="center">
  <img src="https://github.com/maximaslov/secret-santa/blob/main/src/img/for-readme/2-1.png" alt="">
</p>

3.  After that, you will see the name of the person to whom you will give a gift.

<p align="center">
  <img src="https://github.com/maximaslov/secret-santa/blob/main/src/img/for-readme/3-1.png" alt="">
</p>

> **Attention! You can become a Secret Santa only once within one company. Any attempt to do it again will definitely lead to incorrect service operation and someone will be left without a gift, possibly even you.**

***
## Interesting features of the app:

* On the app page in real-time mode, there is virtual snowfall. This is not an animated background picture. Snow falls on top of all the content. For this, the React Snowfall plugin was used.

* In the full version of the site (when the screen width is greater than 1180px), if you try to select the Russian language, the button will run away from the mouse cursor. The button can be caught, but you will only be praised for your good reaction and informed that the app is available only in Ukrainian.

* The mouse cursor looks like a New Year tree to raise the user's pre-New Year mood.

* Errors smoothly float from under the upper screen boundaries, are displayed for several seconds, and also smoothly fade out beyond the screen boundaries.

* The loader (an animated image displayed when the user waits for a response from the server) looks like a dancing Santa.

***
## Error messages:

1. **"Нажаль, немає звʼязку із сервером. Спробуйте, будь ласка, пізніше."** - If the server is not responding or if you have slow internet speed or no internet connection.

2. **"Введіть, будь ласка, кількість участников цифрою."** - If characters other than digits were entered in the field for the number of participants.


3. **"В компанії повинно бути щонайменше 3 учасника."** - If a number less than 3 was entered in the field for the number of participants.


4. **"Паролі не співпадають."** - If the passwords entered in the first and second form.

6. **"У поточній компанії у всіх є таємний санта."** - If there are no participants in the company whose number was entered, for whom a Secret Santa has not been assigned. Check if you entered the correct company number.


6. **"Невірний пароль."** - If you entered an incorrect password for your company. Check if you entered the correct company number.


7. **"Учасник з таким імʼям не знайден в поточній компанії."** - If the name you entered is not in the list registered under the current company number. Please contact the person who registered the company to clarify how they entered your name during registration.


8. **"Жодне поле не повинно бути пустим."** -  If one or more fields were left empty when filling out the list of participants.


9. **"Номер компанії може бути тільки цифрою."** - - If a character other than a digit was entered in the "Enter the company number" field during company registration or when trying to determine who you will be assigned as Secret Santa to.


10. **"Компанія з таким номером не знайдена."**  If no company was registered under the entered number. Make sure you entered the correct number.

***
## Technical Information:

* The application was developed using the **React.js** JavaScript library.
* The **useState()** hook was used to manage the state of the components.
* **Modular CSS** approach was used for styling the components.
* **CSS Flexbox** was used to ensure responsive and adaptive design for different devices.
* The **Axios** library was used for server communication.
* The **Formik** library was used to create the name registration form.
* A free **mockapi.io** service is used as a backend mock.
* The **React Snowfall** library was used to display snow on the page.

***
# ANNOUNCEMENT
#### In the near future, an updated version of the Secret Santa 2.0 application will be released.
**Development start date:** August 01, 2023
**Estimated release date:** November 15, 2023.

## What changes are planned:

1. **Bug fixes:**
  * The application's logic will be moved to context or some state management solution will be used.
  * It will no longer be possible for the same person to become a secret Santa two or more times. Currently, this can lead to someone being left without a gift.
  * It will not be possible to enter two or more identical names. Currently, the service does not recognize this.
  * An issue that can occur with button states when creating a new company will be fixed. Currently, if all fields are filled out and then one is deleted, the "Next" button does not return to the "disabled" state.

2. The problem with the limit on the number of company registrations, caused by the free tariff of mockapi.io, will be resolved.

3. There will be a completely redesigned, modern, and more interactive design.

4. The ability to use the application in English will be added.

5. An external international domain will be connected.
