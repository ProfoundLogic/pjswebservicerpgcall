# Profound.js Web Service RPG program call
A Profound.js example program that consumes a web service and then calls an RPG program to store the data

<!-- TOC depthFrom:2 -->

- [Requirements](#requirements)
- [Installation](#installation)
    - [Profound.js](#profoundjs)
    - [IBM i](#ibm-i)
- [Running the app](#running-the-app)
- [Sample code](#sample-code)

<!-- /TOC -->

Working sample code for a Profound.js application that consumes a web service and then both displays the resulting data on screen using the Profound UI Rich Display and saves the data to a DB2 table on an IBM i using the Profound.js connector.

## Requirements

- Node.js and Profound.js installed either on a PC or IBM i
- An IBM i

## Installation

Follow these instructions to produce a working app.

### Profound.js

- Install Node.js and Profound.js.  This can be done on either a PC or IBM i.
- Clone this repository to a subfolder in the Profound.js `modules` folder.
- Using the included `config.js` as a guide
  - Add an entry for the new module in the `initialModules` section of the `config.js` file in the root Profound.js folder.
  - Adjust the `pathlist` property in `config.js` in the root Profound.js folder, using the included `config.js` as a guide. The pathlist should contain both the sample web service module as well as the sample data library that will be created on the IBM i (if they both have the same name, only one pathlist entry is needed).

### IBM i

- Create a library to contain your sample data, making sure that the library name is included in the `pathlist` property defined in the previous section.
- Create the exchangep table by executing the included `exchangep.sql` script.  Be sure to edit the scripts to contain your own library name.  SQL scripts can be run either from IBM Access Client Solutions on your PC or by issuing a statement on the IBM i like
- Copy the source code from exchanger.src either by copying the file to your IBM i or copy the text and paste it into a new SQLRPGLE source member.
- Compile the EXCHANGER member into the appropriate library. Make sure the library you compile it into is in the pathlist.

```
> RUNSQLSTM SRCSTMF('QSQLSRC/EXCHANGEP.sql') COMMIT(*NONE) NAMING(*SQL)
```

## Running the app

- If Profound.js is installed on the IBM i:
  - If the server was already running you will need to restart it to apply the config file changes
  ```ENDTCPSVR SERVER(*PJS) INSTANCE(PROFOUNDJS)```
  - Start the server
  ```STRTCPSVR SERVER(*PJS) INSTANCE(PROFOUNDJS)```

- If Profound.js is installed on a PC
  - Start the web service from command line by setting your current directory to the Profound.js directory, then issuing this command.
  ```shell
  node start.js
  ```

Point your browser to
```http://[SERVER NAME]:[PORT]/exchange```


## Sample code

The sample code provided is a simple example of consuming a web service from Profound.js and then updating a DB2 table on the IBM i.


The program pulls data from a stock exchange web service and displays the current rates on the screen. As the data is read for the web service the RPG program is called which inserts or updates records as needed.

