
/**
 * Write a description of class PackOfCrisps here.
 *
 * @author (your name)
 * @version (a version number or a date)
 */
public class PackOfCrisps
{
   // instance variables - replace the example below with your own
    private boolean open; 
    //repesent if packet is open or not. can be true or false.
    private int numOfCrisps; 
    //represent the number of crispis in the packet.
    private String flavour;
    //represent the flavour of the crispis in the packet. 
   
    public PackOfCrisps(String givenFlavour)
    {
        // initialise instance variables
        flavour=givenFlavour;
        open=false;
        numOfCrisps=10;
        
       
    }

 
    
    public boolean isEmpty()
    {
         
         
         if(numOfCrisps == 0){
            return true;
        }else{
            return false;
        }
    }
    
    
    // the function will return  oposite to funcion open().
    public boolean isClosed(){
   
        return ! (open);
    }
    public void open(){
        open = true;
    }

    public String getFlavour(){
        return flavour;
    }
    
   
    public void eatCrisp()
    {
       if (isClosed() ){
           System.out.println("Need to open the packet first!");
       }else if (isEmpty()){
           System.out.println("The packet is empty!");
       }else {
           numOfCrisps=numOfCrisps-1;
       }
      
    }
}