
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org
 */



/**
 * Custom blocks
 */
//% color=#0fbc11 icon="\uf1eb" weight=90

namespace ESP8266_IoT {
    let tobesendstring = ""

    /**
     * TODO: Set pin RX and TX for ESP8266 Serial Wifi Module，Baud rate: 115200.
     * @param wifiRX describe parameter here, eg: SerialPin.P2
     * @param wifiTX describe parameter here, eg: SerialPin.P1
     */
    //% weight=100
    //% blockId="wifi_init" block="set ESP8266 RX %wifiRX| TX %wifiTX|at baud rate 115200"
    export function initwifi(wifiRX: SerialPin, wifiTX: SerialPin): void {
        serial.redirect(
            wifiRX,
            wifiTX,
            BaudRate.BaudRate115200
        )
        basic.pause(10)
        serial.writeLine("AT")
        basic.pause(8000)
        serial.writeLine("AT+CWMODE=1")
        basic.pause(6000)
        // Add code here
    }

    /**
     * TODO: connectwifi，Fill in your ssid and your key.
     * @param ssid describe parameter here, eg: "your ssid"
     * @param key describe parameter here, eg: "your key"
     */
    //% weight=99
    //% blockId="wifi_connect" block="connect wifi SSDI: %ssid| KEY: %key"
    export function connectwifi(ssid: string, key: string): void {
        // Add code here
        let text = "AT+CWJAP=\""
                 + ssid
                 + "\",\""
                 + key
                 + "\""
        serial.writeLine(text)
        basic.pause(7000)
    }

    /**
     * TODO: connect thingspeak IoT TCP server 
    */
    //% weight=98
    //% blockId="TCP_connect" block="connect thingspeak"
    export function connectthingspeak(): void {
        // Add code here
        let text = "AT+CIPSTART=\"TCP\",\"184.106.153.149\",80"
        serial.writeLine(text)
        basic.pause(7000)
    }

    /**
     * TODO: Set data to be sent.
     * @param write_api_key describe parameter here, eg: "your write api key"
     * @param n1 describe parameter here, eg: 0
     */
    //% weight=97
    //% blockId="send_text" block="set data to be send : Write API Key= %write_api_key|field1= %n1"
    export function tosendtext(write_api_key: string,
                                n1: number ): void {
        let text=""   
        text = "GET /update?key="
            + write_api_key
            + "&field1="
            + n1
        tobesendstring = text              
        // Add code here
    }

    /**
     * TODO: send data
     */
    //% weight=96
    //% blockId=senddata block="send data to thingspeak"
    export function senddata(): void {
        let text = ""
        text = "AT+CIPSEND=" 
            + (tobesendstring.length + 2)
        serial.writeLine(text)
        basic.pause(7000)
        serial.writeLine(tobesendstring)
        basic.pause(7000)
        // Add code here

    }

}
