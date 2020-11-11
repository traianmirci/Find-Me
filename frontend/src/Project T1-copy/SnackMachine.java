

/**
 * Write a description of class SnackMachine here.
 *
 * @author (your name)
 * @version (a version number or a date)
 */
   //Reference https://www.w3schools.com/java/java_arraylist.asp
   
   
   import java.util.ArrayList; // import the ArrayList class
public class SnackMachine
{
    
    private ArrayList<PackOfCrisps> packOfCrisps ;// Create an ArrayList object
    // maximun number of packet that can be in the machine at any one time
    private int capacity;
    //number of pennys needed to purchase a packet
    private int cost;
    //number of pennys inserted by a customer to buy a packet
    private int payment;
    //array that hold Penny objects
    private ArrayList<Penny> pennies;
    
    
    
    /**
     * Constructor for objects of class SnackMachine
     */
    public SnackMachine(int givenCapacity, int givenCost)
    {
        packOfCrisps= new ArrayList<PackOfCrisps>(); 
        pennies= new ArrayList<Penny>();
        cost=givenCost;
        capacity=givenCapacity;
        payment=0;
    }

    //this method return the cost of purchasing a PackOfCrisps
    public int getCost()
    {
        return cost;
    }
    
     public void addPack(PackOfCrisps pack){
         if (capacity >packOfCrisps.size()){
             packOfCrisps.add(pack);
         }else {
             System.out.println("The machine capacity is full");
         }
    }
    
    public int countPacks(String flavour){
        int counter=0;
        for (int i = 0;i< packOfCrisps.size(); i ++){
            if (flavour== packOfCrisps.get(i).getFlavour()){
                counter= counter+1;
            }
        }
        return counter;
    }
    
    public void insertMoney(Penny penny){
        pennies.add(penny);
        payment=payment+1;
    }
    
    public PackOfCrisps buyPack(String flavour){
       PackOfCrisps chosen=null;
        if (payment < cost ){
           System.out.println("Please insert more pennies!");
           return null;
       }else if (countPacks(flavour)<1){
           return null;
       }else {
           for( int i=0; i <packOfCrisps.size(); i++){
               if(flavour==packOfCrisps.get(i).getFlavour()){
                 chosen = packOfCrisps.get(i);
                 packOfCrisps.remove(i);
                 payment=0;
                }
            }
       }
       return chosen;

    }
    
    public void describe(){
    
        System.out.println("The snack machine has " + packOfCrisps.size() + "packets of crisps left and has taken" + pennies.size() + "pennies in payment");
    
    }
}
