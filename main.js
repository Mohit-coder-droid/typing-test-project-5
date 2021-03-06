console.log('This is running')
		// Creating of an array that will hold the value of all the letters inside string and making it a global variable
		var showing_data = [], letter_already_write=0, char_key, write_input = document.getElementById('write_input_i'), test_msg=document.getElementById('test_msg'), change=0, stop_watch_set_stop, test_mistakes=0, user_data;

		const login_btn=document.getElementById('login_button'), signup=document.getElementById('signup_button'), user_name = document.getElementById('name'), user_password = document.getElementById('password');

		// Declaring the variables that are required for calculating the words per minute and accuracy
		var total_words, total_time_used, test_wpm, test_accuracy;

		// Creating variables that are useful for the data inside the local storage
		var user_test_array = [];

		// Creating of Login function	
		function user_login() {

			// Get the user name and pass words entered by the user
			user_entry_name = user_name.value;
			user_entry_pass = user_password.value;

			// If the user had left the form empty then say him to fill the form
			if (user_entry_name=='' | user_entry_pass=='') {
				alert('Please Fill-up the form');
			}

			// If the user had filled up the form then run this code
			else{
				// Now make the input tag blank
			user_name.value = '';
			user_password.value = '';

			// Entering all the data in the form of json
			user_data = {
					user_entry_name:{
						'password': user_entry_pass,

						// Making date null as the new user had no data in the start
						'date': ''
					}
				}

			// Enter the name and the data entered by the user
			localStorage.setItem('User data', JSON.stringify(user_data));

			// Changes that you have to do in the DOM
			document.getElementById('login_login_succesful').style.display = 'flex';
			document.getElementById('login_login_h1').style.display = 'none';
			document.getElementById('test_header').innerHTML = 'Welcome '+user_entry_name+' ,to Typing Test';
		}
			
		}

		
		// Creating a function for sign up 
		function sign_up() {
			
			// Get the user name and pass words entered by the user
			user_entry_name = user_name.value;
			user_entry_pass = user_password.value;

			if (user_entry_name=='' | user_entry_pass=='') {
				alert('Please Fill-up the form')
			}

			// If the user had filled the form then run this code
			else{

			}
		}

		// Creating a function that will convert the keycode to the character and will check if that is legal or not
		function code_char(keyCode) {
			var key_char = String.fromCharCode(keyCode);

			// Checking if this is legal or not
			var keys_a = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " "]
			var keys_b = [".", "/", ",", "?", "'", `"`, "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "0", "(", ")", "{", "}", ":", ";", "[", "]", "<", ">", "-"]

			// Creating a variable to hold the value of a character keys that are pressed to return it later
			var mn=1;

			for (var i = keys_a.length+keys_b.length; i > 0; i--) {
				// If the keys are in the alphabets array then get the key
				if (keys_a[i-1]==key_char) {
					mn = keys_a[i-1];
				}

				// If the keys are in the sign array then don't highlight any keys 
				else if (keys_b[i-1]==key_char){
					var treeee = 'str' + keys_b[i-1];
					mn = treeee
				}
			}

			// If mn==0 that means that key pressed is not in both of the array, in this condition return invalid keypressed
			if (mn==1) {
				mn='str';
			}

			return mn
		}

		// Creating the number that will compare the thing what you are writing is of which index
		let write_number = 0;

		// Creating a function to chanfe the color of the key when it is pressed
		function myKeyPress(e) {

			for (var i = 0; i < showing.length; i++) {
				showing_data.push(showing(i))
			}


			if (window.event) {

				// char_key is the key that had been pressed
				char_key = code_char(e.keyCode);


				// If the user had finsihed the writing then run this code 
				if (letter_already_write==showing_data.length) {
					// Finsihes the test!!!
					done_test();
				}

				// Of the letter typed and the ;etter that have to be typed are equal then run thsi code
			  // Now remove the extra str from the char_key 

				if (char_key.replace('str', '')==showing_data[letter_already_write]) {
					
						// Get the letter that the user had to write and make them show in written tag
						written.innerHTML = showing_data.slice(0,letter_already_write+1).join("");
						letter_already_write++;
						// Now if the user has finished all the writing stuff then run this code
						if (letter_already_write==showing_data.length) {
						}
					
				}

				// Now if the thing is not actually what it had to write then run this code
				else {
					test_msg.innerHTML = "You missed '" + showing_data[letter_already_write] + "' and pressed '" +char_key + "'.";
					test_msg.style.display = 'flex';

					// Add it to the mistakes variable so we can count the mistakes
					test_mistakes = test_mistakes+1;

					// Play the sound
					var music = document.createElement('embed')
					music.setAttribute('type','audio/wav');
				  music.setAttribute('src', 'ting-in-room.wav');
				  music.setAttribute('autostart', true);
				  music.id = 'Wrong Id'

				  // Now add the attribute to the background
				  document.getElementsByTagName('body')[0].appendChild(music);

				  // Run this after 1 second in which the music get ends
				  setTimeout(() => {
				    document.getElementById('Wrong Id').remove()
				  }, 1000)

					setTimeout(() => {
					  	test_msg.style.display = 'none';
					}, 2000)
				}


				// Now then get the keycode and highlight the key as per the function return
				if (char_key.indexOf('str')==0) {

				}

				// If the user had pressed space then run this code
				else if (char_key==' '){
					document.getElementById('space').style = 'background-color:red';
				}

				else if (char_key.indexOf('str')<0){
					document.getElementById(char_key.toLowerCase()).style = 'background-color:red';
				};

			};
		};

		// Creating a function to chanfe the color of the key when it is up
		function myKeyUp(e) {


				// Now if the user key up then make it change the color
				if (window.event) {

					// This is to slow down the changing process otherwise user will not able to see the chane
					setTimeout(() => {
					  char_key = code_char(e.keyCode)

						// Now then get the keycode and highlight the key as per the function return
						if (char_key.indexOf('str')==0) {
						}

						// If the user had pressed space then run this code
						else if (char_key==' '){
							document.getElementById('space').style = 'background-color:rgb(0,0,196)';
						}

						else if (char_key.indexOf('str')<0){	
							document.getElementById(char_key.toLowerCase()).style = 'background-color:rgb(0,0,196)'
						}
					}, 400)					

				}

				// Calculating the accuracy and WPM
				// Now get the total number of words that the user had to write
				// Split function will divide the words and by length methid we  can get its length
				total_words = written.innerHTML.split(" ").length;

				// Now get the total time that the user had used that is change (in sec) and convert it to minute after dividing it by seconds
				total_time_used = Math.ceil(change/60);

				// Calculating the wpm by diving the total words and total time used
				test_wpm = Math.round(total_words/total_time_used);

				// Now get the accuracy of the test test_mistakes by subtracting the total characters and the character that had been mistaken
				test_accuracy = Math.round(((document.getElementById('showing').innerText.length-test_mistakes)/document.getElementById('showing').innerText.length)*100);

				console.log(document.getElementById('showing').innerText.length, test_mistakes)

				// Now get the about test section
				document.getElementById('test_WPM_span').innerText = test_wpm;
				document.getElementById('test_accuracy_span').innerText = test_accuracy;

		}



		// Creating a function that will set the things what to write
		function write_data() {
			let write_array = ['Touch typing is all about the idea that each finger has its own area on the keyboard. Thanks to that fact you can type without looking at the keys. Practice regularly and your fingers will learn their location on the keyboard through muscle memory.', 'Emboldened with this success, Gandhiji in 1919 decided to launch a nationwide satyagraha against the proposed Rowlatt Act (1919). Act had been hurriedly passed through the Imperial Legislative Council despite the united opposition of the Indian members. It gave the government enormous powers to repress political activities, and allowed detention of political prisoners without trial for two years.','Mahatma Gandhi wanted non-violent civil disobedience against such unjust laws, which would start with a hartal on 6 April, The effects of non-cooperation on the economic front were more dramatic. Foreign goods were boycotted, liquor shops picketed, and foreign cloth burnt in huge bonfires. The import of foreign cloth halved between 1921 and 1922, its value dropping from Rs 102 crore to Rs 57 crore. In many places merchants and traders refused to trade in foreign goods or finance foreign trade. As the boycott movement spread, and people began discarding imported clothes and wearing only Indian ones, production of Indian textile mills and handlooms went up.', 'Ideas of nationalism also developed through a movement to revive Indian folklore. In late-nineteenth-century India, nationalists began recording folk tales sung by bards and they toured villages to gather folk songs and legends. These tales, they believed, gave a true picture of traditional culture that had been corrupted and damaged by outside forces.']

			// Creating a random number to give the user different sets of our words each time the user wants
			let randomNumber = Math.floor(Math.random()*write_array.length)

			return write_array[randomNumber]
		}

		// Creating a function that will run after the starting of the test
		function start_test() {

			// Make the mistakes of the test as 0, so our accuracy don't get mixup with the old accuracy
			test_mistakes = 0;

			// Get the data that user has to write
			var write_array = write_data();

			document.getElementById('showing').innerText = write_array;

			// If somehow letter writing had increased then make i 0
			letter_already_write = 0;

			// First of all make the writing tag blank
			document.getElementById('written').innerText = '';

			document.getElementById('about_test').style.display = 'flex';

			// First thing get the start button and change its innerHTML to the Done button
			start_test_btn.innerHTML = 'Done';

			// Getting the div's requred
			var showing = document.getElementById('showing');
			// var data = showing.innerHTML;
			var data = write_data();
			showing.innerHTML = data;

			var written = document.getElementById('written');

			// Change the focus to the input tag
			write_input_i.focus();

			var i=0;
			// Now check if the first word of the div is the first word that you have to write
			while (i<showing.innerHTML.length){
				showing_data.push(showing.innerHTML.charAt(i));
				i++;
			}

			// Now start the stop watch!!!
			document.getElementById('stop_watch').style.display = 'flex';
			
			// Defining some variables for stopwatch
			var minute=0, sec=0, time=0, current=0, hour=0;

			// Now make a code that will run after 1mili second
			var stop_watch_interval = window.setInterval(stop_watch_set, 1000)

			// This function will change the data inside the stop watch
			function stop_watch_set() {

				sec=sec+1;
				change = change+1;

				if (change%60==0) {
					minute=minute+1;
					sec=0;
				}

				if (change%3600==0) {
					hour=hour+1;
					minute=0;
				}

				time = hour + ":" + minute + ":" + sec;

				document.getElementById('stop_watch').innerHTML = time;

				// Creating a function that will stop the stop watch making it inside the function that had been called in start Interval;
					// stop_watch_set_stop = () => {
					// 	clearInterval(stop_watch_interval);
					// }
			}

		}

		// Creating a function that will be run if the user wants to stop the test
		function done_test() {
			// Stop the stop watch
			// stop_watch_set_stop();

			// Hide the stop watch 
			document.getElementById('stop_watch').style.display = 'none';
			start_test_btn.innerText='Start';

			// Blank the writing area
			document.getElementById('written').innerText = '';

			// Now get the total number of words that the user had to write
			// Split function will divide the words and by length methid we  can get its length
			total_words = written.innerHTML.split(" ").length;

			// Now get the total time that the user had used that is change (in sec) and convert it to minute after dividing it by seconds
			total_time_used = Math.ceil(change/60);

			// Calculating the wpm by diving the total words and total time used
			// test_wpm = Math.round(total_words/total_time_used);
			console.log(test_wpm)

			// Now get the accuracy of the test test_mistakes by subtracting the total characters and the character that had been mistaken
				test_accuracy = Math.round(((document.getElementById('showing').innerText.length-test_mistakes)/document.getElementById('showing').innerText.length)*100);

			// Now take the data of tests done by the user and make the string to JSON
			var user_data_test = JSON.parse(localStorage.getItem('User Test Data'));

			// Get the message div and show the words per minute and accuracy
			document.getElementById('test_msg').innerText = 'Your WPM is ' + test_wpm + " Your Accuracy is " + test_accuracy + ' .';

			// If the user had not done the test before then run this function
			if (user_data_test==null) {


				// Add the first test result into it 
				user_test_array[0] = [test_accuracy, test_wpm];

				user_data_test = {"Test":user_test_array};
				// Set the data of the user to the local storage
				localStorage.setItem('User Test Data', JSON.stringify(user_data_test));

			}

			// If the user data already exists then run this program
			else {
				// Get the user data of test
				user_test_array = user_data_test['Test'];
				console.log('This function is running')

				var changu_variable = (user_test_array.length).toString()

				// Append the result of the test in the end of the array
				user_test_array.push([test_accuracy, test_wpm]);

				user_data_test = {"Test":user_test_array};

				// Now set the new array 
				localStorage.setItem('User Test Data', JSON.stringify(user_data_test));
			}

			console.log(user_data_test['Test'].length);

			// Now create an array which can be used as a direct data for the google charts
			var user_test_chart = [['Tests', 'Accuracy', 'WPM (Words Per Minute)']];

			// Creating a second array for manpulation of the data
			var user_test_chart_1 = [];

			// Something is Happerning, I declare the variable just before it and it gives me the other value just after its next line


			// Get all the things from the JSON data and convert it into array
			for (var i = 0; i < user_data_test['Test'].length; i++) {
				var user_test_chart_data = [user_data_test['Test'][i][0], user_data_test['Test'][i][1]]
				user_test_chart_1.push(['Test'+i, user_test_chart_data[0], user_test_chart_data[1]]);
			};

			// Take only 5 elemenets of the array as we don't want more then 5 elements of the data returned by the local Storage
			user_test_chart_1 = user_test_chart_1.slice((user_test_chart_1.length-5), (user_test_chart_1.length))
 

			// Now mix both the array
			user_test_chart = user_test_chart.concat(user_test_chart_1);
			console.log(user_test_chart)

			// Get the sorry statistics and make it none so our chart coorinates get fixed
			document.getElementById('statistics_sorry').style.display = 'none';

			// Now load all the packages requred for the graph
		 	// google.charts.load('current', {'packages':['bar']});
    //   google.charts.setOnLoadCallback(drawChart);

      // Creating a function that will draw the charts
			// function drawChart(arr) {
   //      var data = google.visualization.arrayToDataTable(user_test_chart);

   //      var options = {
   //        chart: {                                               
   //          title: 'Test Result',
   //          subtitle: 'Statistics of your typing test',
   //          chartArea:{left:0,top:0,width:"100%",height:"100%"},
   //          width : 200,
   //          height: 200
   //        }
   //      };

   //      var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

   //      chart.draw(data, google.charts.Bar.convertOptions(options));
   //    }

      // After 5 seconds make the about test section hidden
      setInterval(() => {
      	document.getElementById('about_test').style.display = 'none'
      }, 5000)

		}

		// Start the test if the user pressed the done buttob
		let start_test_btn = document.getElementById('test_start');
		start_test_btn.addEventListener('click', (e)=>{

			// Delete this, we want done to be tap as early as the user finishes the typing, not be the done button

			// If the inner html of the button is start that means the user wants to staet then run this code
			if (start_test_btn.innerText=='Start') {
				start_test();
			}

			// If the inner html of the button is done that means the user wants to end then run this code
			else if (start_test_btn.innerText=='Done') {
				done_test();
			}
		});