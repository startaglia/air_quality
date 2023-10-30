# Country Wiki
Country Wiki is a small web app that provides general information about a specific country. The user can search according to specific criteria such as the language spoken, the capital or the region. The goal of this project was to build the server code well and I particularly focused on API requests. The reference API was https://restcountries.com.





# Minishell

Minishell is a reproduction of some basic functionalities of the Unix (bash) shell.
The shell allows users to interact with the operating system by executing
commands, managing processes, and working with files and directories.
Minishell is a significant project in the journey of 42 as it provides a valuable opportunity
to gain a comprehensive understanding of fundamental concepts
in operating systems and acquire essential skills in managing processes and system resources.



## Installing and running the project:

To run Minshell make sure you have these packages installed:

```
gcc make python-norminette readline (valgrind on Linux)
```

To install readline on Ubuntu and Debian:

```
$ sudo dnf install readline-devel
```

To install readline on Fedora:

```
$ sudo apt-get install libreadline-dev
```

To install readline on CentOS o RHEL:

```
$ sudo yum install readline-devel
```

To install readline on openSUSE:

```
$ sudo zypper install readline-devel
```

Note for MacOS: to install a recent version of readline, you need to use homebrew: brew install readline.</br>

1- Clone the repo:

  ```sh
  git clone https://github.com/startaglia/minishell.git minishell
  ```

2- Enter in minishell dir and compile the program with the `make` command

 ```
  cd minishell
	make
 ```
4- Run the program and you're in!

	./minishell

### Makefile Available Targets:

`make` or `make all` - Makes exe file/s</br>
`make clean` - Deletes all the resulting object files
`make fclean` - Deletes the executables and all the resulting object files
`make re` - fclean + all
</br></br>

## Some commands you can try:
As this project is made to mimic bash, you can try any commands you normally would try in bash. You do have to enter each line separately as the program doesn't handle new lines.

```
	cd ..
	cd minshell
	echo hello world!
	pwd
	ls -la
	ls -la | wc -l
	ls -la | wc -l > test.txt
	cat test.txt
	cat < file.txt
	echo Hey! << EOF
	rm test.txt
	env
	export TEST_VAR=42
	env
	unset TEST_VAR
	env
 ```
to exit the program

	exit

 <a href="https://42roma.it/"><img src="https://github.com/startaglia/startaglia/blob/main/.media/minishell.gif"></a>
## Technologies Used:

- **Programming Language**: C
- **Operating System**: Linux
- **Compiler**: GCC (GNU Compiler Collection)
- **Build System**: GNU Make
- **C Standard Library**
- **Process Management**: System calls like `fork()`, `exec()`, and `waitpid()`
- **String Handling**: Standard library functions from `string.h`
- **Command Line Arguments Handling**: Techniques such as `argc`/`argv`



## Authors:

- **Simone Tartaglia**
  - Email: [startaglia89@gmail.com](mailto:startaglia89@gmail.com)
  - GitHub: [startaglia](https://github.com/startaglia)
  - LinkedIn: [Simone Tartaglia](https://www.linkedin.com/in/simone-tartaglia-134723248/)

- **Simone Castagnoli**
  - GitHub: [IamG-Root](https://github.com/IamG-Root)

- **Davide Carassiti**
  - GitHub: [DarkB0shy](https://github.com/DarkB0shy)

- **Alessandro Pellizzi**
  - GitHub: [Beta-J23](https://github.com/Beta-J23)
