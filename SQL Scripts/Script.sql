If Not Exists(select * from sys.objects where name='TempCart' and type='U')
Create Table TempCart
(ID int identity(1,1) NOT NULL ,
 MEMBERNO INT,
 ProductID int NULL,
 ProductCategory nvarchar(200) NULL,
 ProductCode nvarchar(200) NULL,
 Product nvarchar(200) NULL,
 Price money NULL,
 TotalPrice money NULL,
 Qty int NULL 
)
Alter Table Members add SessionId nvarchar(20)
Go
If Exists(select * from sys.objects where name='fn_showaction_onGrid' and type ='FN')
Drop Function fn_showaction_onGrid
Go
-- created by ramaK on 23-01-2021 to get the action column details on grid.
Create Function fn_showaction_onGrid(
 @memberno int )
 Returns int as 
Begin
Declare @value int 
Declare @value2 int
SELECT @value= COUNT(ID) FROM Registration WHERE (MemberNo = @memberno)
If @value = 0 
	Set @value2=0
Else
	Set @value2=1
Return @value2
End
Go
Grant Execute on fn_showaction_onGrid to ABBI_DEV
Go
--------------------------------------------------------------  
If exists(select * from sys.objects where name='fu_WorkOrder_CategoryListnew'  and type='FN')
Drop Function fu_WorkOrder_CategoryListnew
Go
/*
Created by Ramakrishna on 02/09/2021 to seperate the DNA kits from Product Category.
*/
create function fu_WorkOrder_CategoryListnew  
(@WorkOrderNumber int)  
returns varchar(500)  
as  
begin  
 declare @CategoryList  varchar(500)  
   
 select @CategoryList = COALESCE(@CategoryList + ', ', '') + Category  
 from (  
 select distinct (case when i.Description like 'DNA%' then 'DNA kits' else category end) as category, c.sortorder  
 from WorkOrderCategory c  
 join WorkOrderLineItems i on c.categoryid = i.categoryid  
 join WorkOrderLines l on i.LineItemId = l.LineItemId  
 where WorkOrderNumber = @WorkOrderNumber  
   
 ) a  
 order by sortorder   
   
   
 return @CategoryList  
end  
Go
Grant Execute on fu_WorkOrder_CategoryListnew to ABBI_DEV
Go
--------------------------------------------------------------  
If exists(select * from sys.objects where name='_AddsingleAnimal_Dam' and type='P')
Drop procedure _AddsingleAnimal_Dam
Go
/*    

 Created by RamaKrishna on 02/04/2021 to insert into  the TempDNA table    

*/    

    

create Procedure _AddsingleAnimal_Dam(    

@txtRegno int ,    

@MemberNumber int,    

@birthdate date,    

@SexCode nvarchar(10)='C',    

@SessionID nvarchar(50),  

@RegNoID int  

)    

As    

BEGIN     

 DECLARE @ERR int =1    

  DECLARE @RegNo int    

  DECLARE @Animal nvarchar(255)    

  DECLARE @Bdate date   

  IF EXISTS(  

  SELECT 1 FROM Registration WHERE RegNo =@txtRegno      

  and memberno <> 1657 and ( typeservice like '%'+@SexCode or regno < 1000000)   

  )  

  BEGIN  

  SELECT @RegNo= RegNo,@Animal= Animal,@Bdate= birthdate FROM Registration WHERE RegNo =@txtRegno      

  and memberno <> 1657 and ( typeservice like '%'+@SexCode or regno < 1000000)  

  END  

  ELSE  

  BEGIN  

 RETURN  

  END       

  IF @Bdate is not null and @Bdate<>''    

  BEGIN    

   IF @Bdate<@birthdate    

    SET @ERR=0    

  END    

  ELSE    

  BEGIN

	IF @Bdate is null or @Bdate=''

	SET @ERR=0

   IF @RegNo is not null and @RegNo<>''    

   BEGIN    

    SET @ERR=0    

   END     

  END    

  DECLARE @COUNT Int    

  SELECT @COUNT= COUNT(RegNo) FROM TempDNA WHERE RegNo =@txtRegno  AND RegNoID =@RegnoID     

  IF @COUNT=0    

  BEGIN    

   SET @ERR=0  

  END    

   DECLARE @MenberNo int    

   SELECT @MenberNo=MemberNo FROM Registration WHERE RegNo = @RegNo        

  

IF @ERR=0    

BEGIN    

 INSERT INTO TempDNA (RegNoID, RegNo, Sex, MemberNumber, InsertedToDNA, VoucherNumber)    

 VALUES(@RegnoID,@RegNo,'Dam',@MenberNo,0,NULL)    

END    

END 
Go

Grant Execute on _AddsingleAnimal_Dam to ABBI_DEV

GO

If exists(select * from sys.objects where name='_DamsfrmHerd' and type='P')
Drop procedure _DamsfrmHerd
Go
/*    

 Created by RamaKrishna on 02/04/2021 to insert into  the TempDNA table    

*/    

Create Procedure _DamsfrmHerd  

(  

@txtRegno int ,  

@MemberNumber int,  

@birthdate date,  

@SexCode nvarchar(10),  

@SessionID nvarchar(20),  

@RegNoID int,  

@Action nvarchar(100)  

)  

AS  

BEGIN  

IF @Action='AddRegNo'  

BEGIN  

    INSERT INTO TempDNA (RegNoID, RegNo, Sex, MemberNumber, InsertedToDNA, VoucherNumber)   

    VAlUES (@RegNoID,@txtRegno,'Dam',@MemberNumber,0,NULL)  

END  

END
Go

Grant Execute on _DamsfrmHerd to ABBI_DEV

GO

If exists(select * from sys.objects where name='_getcurrentbreedingSH' and type='P')
Drop procedure _getcurrentbreedingSH
Go
/*  

        Created by RamaKrishna on 02/04/2021 to get the current breeding data in Someones Herd.  

*/  

Create Procedure _getcurrentbreedingSH  

(  

@txtRegno int ,  

@MemberNumber int,  

@birthdate date,  

@SexCode nvarchar(10),  

@SessionID nvarchar(20),  

@RegNoID int,  

@Action nvarchar(100)  

)  

AS  

BEGIN  



IF @Action='BreedingList'  

BEGIN  

	SELECT   

    b.RegNo,   

    r.Animal,  

    case r.sold when  1 then 'Sold'  else m.LastName + ', ' + m.FirstName end AS MemberName  

   FROM CurrentBreedingAnimals b  

   join Registration r on b.regno = r.regno  

   left join Members m ON r.MemberNo = m.MemberNumber and r.MemberNo <> @MemberNumber  

   WHERE b.MemberNo = @MemberNumber  

   AND (r.TypeService = 'NB' OR r.TypeService = 'AB' OR r.TypeService = 'EB')  

   and r.MemberNo <> 1657  

   order by b.regno desc 

END  
END
Go

Grant Execute on _getcurrentbreedingSH to ABBI_DEV

GO

If exists(select * from sys.objects where name='_SiresfrmHerd' and type='P')
Drop procedure _SiresfrmHerd
Go
/*  

        Created by RamaKrishna on 02/02/2021 to insert Sires t0 TempDNA table from current member herd.  

*/  

CREATE Procedure _SiresfrmHerd  

(  

@txtRegno int ,  

@MemberNumber int,  

@birthdate date,  

@SexCode nvarchar(10),  

@SessionID nvarchar(20),  

@RegNoID int,  

@Action nvarchar(100)  

)  

AS  

BEGIN  

IF @Action='AddRegNo'  

BEGIN  

        DECLARE @ERR int =1  

        DECLARE @Sire int  

        DECLARE @vocherno nvarchar(50)=Null  

        IF  EXISTS  

 (  

        SELECT top 1 SireRegNo,VoucherNo from OffspringVouchers ov join registration r on ov.sireregno = r.regno     

    where SireRegNo = @txtRegno    

    and r.memberno <>   @MemberNumber )  

        BEGIN  

                RETURN  

        END  

        ELSE  

        BEGIN  

                SET @Sire=0  

        END  

        IF @Sire =0  or @Sire=''  

        BEGIN  

                INSERT INTO TempDNA (RegNoID, RegNo, Sex, MemberNumber, InsertedToDNA, VoucherNumber)   

                VAlUES (@RegNoID,@txtRegno,'Sire',@MemberNumber,0,@vocherno)  

        END  

END  

IF @Action='BreedingList'  

BEGIN  

        declare @Count int  

            

        select @Count = count(*)     

        from CurrentBreedingAnimals    

        where MemberNo = @MemberNumber    

        and Regno = @txtRegno    

    

        if @Count > 0     

        set @Count = -1    

        else    

        begin  

        select @Count = count(*)     

        from CurrentBreedingAnimals    

        where MemberNo = @MemberNumber  

        end  

        if @Count<>-1 and @Count<10  

        BEGIN  

        Insert into CurrentBreedingAnimals (MemberNo, Regno) values (@MemberNumber, @txtRegno)  

        END  

	SELECT   

    b.RegNo,   

    r.Animal,  

    case r.sold when  1 then 'Sold'  else m.LastName + ', ' + m.FirstName end AS MemberName  

   FROM CurrentBreedingAnimals b  

   join Registration r on b.regno = r.regno  

   left join Members m ON r.MemberNo = m.MemberNumber and r.MemberNo <> @MemberNumber  

   WHERE b.MemberNo = @MemberNumber  

   AND (r.TypeService = 'NB' OR r.TypeService = 'AB' OR r.TypeService = 'EB')  

   and r.MemberNo <> 1657  

   order by b.regno desc 

END  

IF @Action='Remove'  

BEGIN  

        Delete from CurrentBreedingAnimals where MemberNo = @MemberNumber and Regno = @txtRegno  

END  

END
Go

Grant Execute on _SiresfrmHerd to ABBI_DEV

GO

If exists(select * from sys.objects where name='_AnimalRegistration_tempDNA' and type='P')
Drop procedure _AnimalRegistration_tempDNA
Go
 -- modified by ramaK on 02-02-2021  
CREATE     PROCEDURE [dbo].[_AnimalRegistration_tempDNA] 



(



	@Page int = 1,



       	@RecsPerPage int = 600000000,

@txtRegno int ,

@MemberNumber int,

@birthdate date,

@SexCode nvarchar(10),

@SessionID nvarchar(20),

@RegNoID int,

@Action nvarchar(100) = null

)



AS







SET NOCOUNT ON







DECLARE @RecCount int



SELECT @RecCount = @RecsPerPage * @Page + 1







CREATE TABLE #TempItems



(



	SID int IDENTITY,



	tempDnaID int, 



	RegNo int, 



	Animal nvarchar(200),



	sex nvarchar(50)



)







-- Insert the rows from tblItems into the temp. table



INSERT INTO #TempItems (tempDnaID, RegNo, Animal, Sex)



SELECT TempDnaID, TempDNA.RegNo, registration.Animal, TempDNA.Sex



FROM dbo.TempDNA



join tempRegistration tr on tempDNA.RegNoId = tr.RegNoId



INNER JOIN Registration ON TempDNA.RegNo = Registration.RegNo



WHERE (((@MemberNumber = null) OR (tr.MemberNo = @MemberNumber))



AND ((@RegNoID = null) OR (dbo.TempDNA.RegNoID = @RegNoID)))



--order by tempdna.regno







-- Find out the first and last record we want



DECLARE @FirstRec int, @LastRec int



SELECT @FirstRec = (@Page - 1) * @RecsPerPage



SELECT @LastRec = (@Page * @RecsPerPage + 1)







-- Now, return the set of paged records, plus, an indiciation of we have more records or not!



SELECT *,







       MoreRecords = 







            (







             SELECT COUNT(SID) 







             FROM #TempItems TI







             WHERE TI.SID > @LastRec







            ),







               xCount = 







            (







             SELECT COUNT(SID) 







             FROM #TempItems TI







            ) 



FROM #TempItems



WHERE SID > @FirstRec AND SID < @LastRec







-- Turn NOCOUNT back OFF



SET NOCOUNT OFF

Go

Grant Execute on _AnimalRegistration_tempDNA to ABBI_DEV

GO

If exists(select * from sys.objects where name='_AddsingleAnimal' and type='P')
Drop procedure _AddsingleAnimal
Go
/*  

 Created by RamaKrishna on 02/01/2021 to insert  the TempDNA table  

*/  

  

create Procedure _AddsingleAnimal(  

@txtRegno int ,  

@MemberNumber int,  

@birthdate date,  

@SexCode nvarchar(10)='B',  

@SessionID nvarchar(50),

@RegNoID int

)  

As  

BEGIN   

 DECLARE @ERR int =1  

 DECLARE @Sire int  

 DECLARE @vocherno nvarchar(50)  

 IF  EXISTS

 (

	SELECT top 1 SireRegNo,VoucherNo from OffspringVouchers ov join registration r on ov.sireregno = r.regno   

    where SireRegNo = @txtRegno  

    and r.memberno <>   @MemberNumber )

	BEGIN

		RETURN

	END

	ELSE

	BEGIN

		SET @Sire=0

	END

 IF @Sire =0 or @Sire=''  

 BEGIN   

  DECLARE @RegNo int  

  DECLARE @Animal nvarchar(255)  

  DECLARE @Bdate date 

  IF EXISTS(

  SELECT 1 FROM Registration WHERE RegNo =@txtRegno    

  and memberno <> 1657 and ( typeservice like '%'+@SexCode or regno < 1000000) 

  )

  BEGIN

  SELECT @RegNo= RegNo,@Animal= Animal,@Bdate= birthdate FROM Registration WHERE RegNo =@txtRegno    

  and memberno <> 1657 and ( typeservice like '%'+@SexCode or regno < 1000000)

  END

  ELSE

  BEGIN

	RETURN

  END

  IF @Bdate is not null and @Bdate<>''

  SELECT @RegNo= RegNo,@Animal= Animal,@Bdate= birthdate FROM Registration WHERE RegNo =@txtRegno    

  and memberno <> 1657 and ( typeservice like '%'+@SexCode or regno < 1000000)   

  IF @Bdate is not null and @Bdate<>''  

  BEGIN  

   IF @Bdate<@birthdate  

    SET @ERR=0  

  END  

  ELSE  

  BEGIN  

   IF @RegNo is not null and @RegNo<>''  

   BEGIN  

    SET @ERR=0  

   END   

  END  

  DECLARE @COUNT Int  

  SELECT @COUNT= COUNT(RegNo) FROM TempDNA WHERE RegNo =@txtRegno  AND RegNoID =@RegnoID   

  IF @COUNT=0  

  BEGIN  

   SET @ERR=0

  END  

   DECLARE @MenberNo int  

   SELECT @MenberNo=MemberNo FROM Registration WHERE RegNo = @RegNo  

 END    



IF @ERR=0  

BEGIN  

 INSERT INTO TempDNA (RegNoID, RegNo, Sex, MemberNumber, InsertedToDNA, VoucherNumber)  

 VALUES(@RegnoID,@RegNo,'Sire',@MenberNo,0,@vocherno)  

END  

END 
Go

Grant Execute on _AddsingleAnimal to ABBI_DEV

GO

If exists(select * from sys.objects where name='_instempregistration' and type='P')
Drop procedure _instempregistration
Go
/*  

 Created by RamaKrishna on 01/30/2021 to insert and update the Tempregistration table  

*/  

  

CREATE procedure _instempregistration    

(    

@MemberNo int ,     

@OriginalBreeder nvarchar(100),     

@Birthdate datetime ,    

@PrivateHerd nvarchar(500),     

@EarTag nvarchar(100),     

@Animal nvarchar(500),     

@TypeService nvarchar(500),     

@Horns nvarchar(100),    

@Description nvarchar(500),    

@ProvideDNAInfo int,    

@RushRegistration int,     

@Status nvarchar(100),    

/*@DateRegistered date,    

@LastUpdated date,   

@updatedby nvarchar(100),   */   

@SessionID nvarchar(1000)  

)    

AS    

 BEGIN    

  INSERT INTO TempRegistration (MemberNo, OriginalBreeder, Birthdate, PrivateHerd, EarTag, Animal, TypeService, Horns, Description,     

  ProvideDNAInfo, RushRegistration, Status, DateRegistered, LastUpdated, UpdatedBy, SessionID)    

  VALUES (@MemberNo, @OriginalBreeder, @Birthdate, @PrivateHerd, @EarTag, @Animal, @TypeService, @Horns, @Description,     

  @ProvideDNAInfo, @RushRegistration, @Status,CAST(CURRENT_TIMESTAMP as Date), CAST(CURRENT_TIMESTAMP as Date), 'Member', @SessionID);     

    

    

 ---To update price in tempregistration    

    

 Declare @registrationCatalog int    

 Declare @JoinDate datetime    

 Declare @AlternateAccount datetime    

 Declare @price money    

  SET @registrationCatalog=@ProvideDNAInfo    

  Declare @numberofMonths int    

  SET @numberofMonths=DATEDIFF(MONTH,@JoinDate,CURRENT_TIMESTAMP);    

  Declare @tempsex nvarchar(5)    

  Declare @numberofYears int    

  SET @tempsex=(Case when @typeservice like '%B' then 'M' else'F' end)    

  SET @numberofYears=DATEDIFF(YEAR,@Birthdate,CURRENT_TIMESTAMP)    

 IF @registrationCatalog=1    

 BEGIN    

  SELECT @JoinDate=JoinDate FROM Members WHERE MemberNumber =@MemberNo    

  SELECT @AlternateAccount=AlternateAccount FROM Members WHERE MemberNumber =@MemberNo    

    

  IF LEN(@JoinDate)>0    

  --check joindate for new member.    

  BEGIN    

   IF @numberofMonths<=12 and @AlternateAccount=0    

   BEGIN    

    IF YEAR(CURRENT_TIMESTAMP)>=2010    

    BEGIN    

     IF YEAR(@JoinDate)=2009 and YEAR(@Birthdate)=2010    

     BEGIN    

      SET @price=40.00    

     END    

     ELSE IF YEAR(@JoinDate)=2009 and YEAR(@Birthdate)<2010    

     BEGIN    

      SET @price=50.00    

     END    

     ELSE IF YEAR(@JoinDate)>2010 or @numberofYears=0     

     BEGIN    

      SELECT @price=NewMember FROM AnimalRegistrationPrice     

      WHERE BirthYear = YEAR(CURRENT_TIMESTAMP)     

      AND (ISNULL(Gender,'') = '' OR Gender =@tempsex)    

     END    

     ELSE IF @numberofYears=1       

     BEGIN    

      SELECT @price=NewMember_1yr_older FROM AnimalRegistrationPrice     

      WHERE BirthYear = YEAR(@Birthdate)     

      AND (ISNULL(Gender,'') = '' OR Gender =@tempsex)    

     END    

     ELSE    

     BEGIN    

      SELECT @price=NewMember_1yr_older FROM AnimalRegistrationPrice     

      WHERE BirthYear = 2007     

      AND (ISNULL(Gender,'') = '' OR Gender =@tempsex)    

     END    

     SET @price=ROUND(@price,2)    

    END    

    ELSE    

    BEGIN    

     IF @numberofYears=0    

     BEGIN    

      SELECT @price=NewMember FROM AnimalRegistrationPrice     

      WHERE BirthYear = YEAR(@Birthdate)     

      AND (ISNULL(Gender,'') = '' OR Gender =@tempsex)    

     END    

     ELSE    

     BEGIN    

      SELECT @price=NewMember_1yr_older FROM AnimalRegistrationPrice     

      WHERE BirthYear = 2007     

      AND (ISNULL(Gender,'') = '' OR Gender =@tempsex)    

     END    

     SET @price=ROUND(@price,2)    

    END    

   END    

   ELSE    

   BEGIN    

    IF @numberofYears=0    

    BEGIN    

     SELECT @price=Reg_1yr FROM AnimalRegistrationPrice     

     WHERE BirthYear = YEAR(@Birthdate)     

     AND (ISNULL(Gender,'') = '' OR Gender =@tempsex)    

    END    

    ELSE IF @numberofYears=1   

    BEGIN    

     SELECT @price=Reg_2yr FROM AnimalRegistrationPrice     

     WHERE BirthYear = YEAR(@Birthdate)     

     AND (ISNULL(Gender,'') = '' OR Gender =@tempsex)    

    END    

    ELSE        BEGIN    

     IF YEAR(@Birthdate) <2008    

     BEGIN    

      SELECT @price=Reg_2yr_older FROM AnimalRegistrationPrice     

      WHERE BirthYear = 2007     

      AND (ISNULL(Gender,'') = '' OR Gender =@tempsex)    

     END    

     ELSE    

     BEGIN    

      SELECT @price=Reg_2yr_older FROM AnimalRegistrationPrice     

      WHERE BirthYear = YEAR(@Birthdate)     

      AND (ISNULL(Gender,'') = '' OR Gender =@tempsex)    

     END    

    END    

    SET @price=ROUND(@price,2)    

   END    

  END    

  ELSE    

  BEGIN    

   IF @numberofYears=0    

    BEGIN    

     SELECT @price=Reg_1yr FROM AnimalRegistrationPrice     

     WHERE BirthYear = YEAR(@Birthdate)     

     AND (ISNULL(Gender,'') = '' OR Gender =@tempsex)    

    END    

    ELSE IF @numberofYears=1    

    BEGIN    

     SELECT @price=Reg_2yr FROM AnimalRegistrationPrice     

     WHERE BirthYear = YEAR(@Birthdate)     

     AND (ISNULL(Gender,'') = '' OR Gender =@tempsex)    

    END    

    ELSE    

    BEGIN    

     IF YEAR(@Birthdate) <2008    

     BEGIN    

      SELECT @price=Reg_2yr_older FROM AnimalRegistrationPrice     

      WHERE BirthYear = 2007     

      AND (ISNULL(Gender,'') = '' OR Gender =@tempsex)    

     END    

     ELSE    

     BEGIN    

      SELECT @price=Reg_2yr_older FROM AnimalRegistrationPrice     

      WHERE BirthYear = YEAR(@Birthdate)     

      AND (ISNULL(Gender,'') = '' OR Gender =@tempsex)    

     END    

    END    

   END    

   SET @price=ROUND(@price,2)    

  END    

 ELSE    

 BEGIN    

  SELECT @price=CatOnly FROM AnimalRegistrationPrice     

  WHERE BirthYear = YEAR(@Birthdate)     

  AND (ISNULL(Gender,'') = '' OR Gender =@tempsex)     

 END    

 SET @price=ROUND(@price,2)    

 IF @price is not null or @price<>0    

 BEGIN    

  UPDATE TempRegistration SET RegistrationPrice = @price     

  WHERE MemberNo=@MemberNo And Animal=@Animal And PrivateHerd=@PrivateHerd And TypeService=@TypeService  

  And Horns=@Horns And Status=@Status  

 END   

END 
Go

Grant Execute on _instempregistration to ABBI_DEV

GO
 
If exists(select * from sys.objects where name='_MemberSelectInsertUpdate1' and type='P')
Drop procedure _MemberSelectInsertUpdate1
Go     

 -- modified by ramaK on 25-01-2021 to show the tabs details.    

 -- modified by ramaK on 27-01-2021 to get the duedate based on type selection  

    

Create PROCEDURE [dbo].[_MemberSelectInsertUpdate1]     

    

    

    

(    

    

    

    

 @Itemsel int=null,    

    

 @Itemins int=null,    

    

 @Itemupd int=null,    

    

 @Iteminv int=null,    

    

 @Itempre int=null,    

    

 @Itemprt int=null,    

    

 @Itememail int =null,    

    

 @ItemFailedtest int=null,     

 

 @ItemchangeP int=null,

    

    

 @MemberNumber int = null,    

    

    

    

 @FirstName nvarchar(255) = null,     

    

    

    

 @LastName nvarchar(255) = null,     

    

    

    

 @RanchName nvarchar(255) = null,      

    

    

    

 @Address nvarchar(255) = null,     

    

    

    

 @City nvarchar(255) = null,     

    

    

    

 @State nvarchar(255) = null,     

    

    

    

 @Zip nvarchar(255) = null,     

    

    

    

 @Country nvarchar(255) = null,    

    

    

    

 @Phone nvarchar(255) = null,     

    

    

    

 @AltPhone nvarchar(255) = null,     

    

    

    

 @JoinDate datetime = null,     

    

    

    

 @DueDate datetime = null,     

    

    

    

 @PaidDate datetime = null,     

    

    

    

 @Email nvarchar(255) = null,     

    

    

    

 @Birthdate datetime = null,     

    

    

    

 @Type  nvarchar(255) = null,     

    

    

    

 @Notes  nvarchar(255) = null,     

    

    

    

 @Updated datetime = null,     

    

    

    

 @Updatedby  nvarchar(50) = null,     

    

    

    

 @Office  nvarchar(50) = null,     

    

    

    

 @Fax nvarchar(50) = null,    

    

    

    

 @Website varchar(500) = null,    

    

    

    

 @UserName nvarchar(250) = null,    

    

    

    

 @Password nvarchar(250) = null,    

    

    

    

 @Inactive int = 0,    

    

    

    

 @AlternateAccount bit = 0,    

    

    

    

    @PremiseID nvarchar(12) = null,    

    

    

    

 @SortCol int = 1,     

    

    

    

 @SortDIR nvarchar(5) = 'ASC' ,

 

 @HideContactInfo bit=0,



 @NewsletterPromotion bit =0,



 @BulkEmailFail bit=0

    

    

    

)    

    

    

    

AS    

    

    

    

    

    

    

    

SET NOCOUNT ON    

    

    

    

    

    

    

    

IF @Itemsel = 1    

    

BEGIN    

    

 SELECT MemberNumber, FirstName, LastName, MemberName, RanchName, Address, City, State, Zip, Country, Phone, AltPhone    

    

    

    

         , JoinDate, DueDate, PaidDate, Email, MemberBirthdate, Type, Notes, updated, Updatedby, Office, Fax, Website    

    

    

    

         , UserName, Password, Inactive, AlternateAccount, PremiseID,HideContactInfo,NewsletterPromotion    

    

    

    

 FROM Members     

    

    

    

 WHERE (MemberNumber = @MemberNumber)    

    

    

    

    

    

END    

    

IF @Itemins = 1     

BEGIN    

    

  If @Type In('Lifetime','Veterinarian')  

  Begin  

  SET @DueDate =NULL  

  End   

 If @Type='Veterinarian'   

 SET @PaidDate=NULL  

  

    

 INSERT INTO Members (MemberNumber, FirstName, LastName, RanchName, MemberName, Address, City, State, Zip, Country, Phone, AltPhone    

    

    

    

                        , JoinDate, DueDate, PaidDate, Email, MemberBirthdate, Type, Notes, Updated, Updatedby, Office, Fax, Website    

    

    

    

                        , Prt, UserName, Password, OriginalBreeder, Inactive, AlternateAccount, PremiseID)    

    

    

    

 Values (@MemberNumber, @FirstName, @LastName, @RanchName, @LastName + ', ' + @FirstName, @Address, @City, @State, @Zip, @Country, @Phone, @AltPhone    

    

    

    

           , @JoinDate, @DueDate, @PaidDate, @Email, @Birthdate, @Type, @Notes, @Updated, @Updatedby, @Office, @Fax, @Website    

    

    

    

           , 0, @UserName, @Password, @MemberNumber, @Inactive, @AlternateAccount, @PremiseID)    

    

    

    

    

END    

    

    

IF @Itemupd = 1    

    

BEGIN    

    

 UPDATE Members     

    

    

    

       SET FirstName = @FirstName, LastName = @LastName, RanchName = @RanchName, MemberName = @LastName + ', ' + @FirstName    

    

    

    

         , Address = @Address, City = @City, State = @State, Zip = @Zip, Country = @Country    

    

    

    

         , Phone = @Phone, AltPhone = @AltPhone, JoinDate = @JoinDate, DueDate = @DueDate, PaidDate = @PaidDate    

    

    

    

         , Email = @Email, MemberBirthdate = @Birthdate, Type = @Type, Notes = @Notes, Updated = @Updated, Updatedby = @Updatedby    

    

    

    

         , Office = @Office, Fax = @Fax, Website = @Website, UserName = @UserName, Password = @Password, Inactive = @Inactive    

    

    

    

         , AlternateAccount = @AlternateAccount, PremiseID = @PremiseID    

    

    

    

 WHERE MemberNumber = @MemberNumber    

    

    

    

END    

    

    

    

IF @Iteminv = 1 and @Itempre is null and @Itemprt is null and @Itememail is null and @ItemFailedtest is null    

BEGIN    

    

    

 SELECT ID, r.RegNo, Animal, PrivateHerd, TypeService, Birthdate, Sire, Dam, DNA, Status, Lastupdate, r.pbs_id, outcount, avgmark     

    

    

    

 FROM Registration r    

    

    

    

 left join bullstats bs on r.pbs_id = bs.pbs_id    

    

    

    

 WHERE (MemberNo = @MemberNumber)    

    

    

    

 and sold=0    

    

    

    

 ORDER BY     

    

    

    

 CASE WHEN @SortCol = 1  AND @SortDIR = 'ASC' THEN r.RegNo END ASC,    

    

    

    

 CASE WHEN @SortCol = 2  AND @SortDIR = 'ASC' THEN Animal  END ASC,    

    

    

    

 CASE WHEN @SortCol = 3  AND @SortDIR = 'ASC'  THEN PrivateHerd  END ASC,    

    

    

    

 CASE WHEN @SortCol = 4  AND @SortDIR = 'ASC' THEN TypeService END ASC,    

    

    

    

 CASE WHEN @SortCol = 5  AND @SortDIR = 'ASC' THEN Birthdate  END ASC,    

    

    

    

 CASE WHEN @SortCol = 6  AND @SortDIR = 'ASC' THEN Sire  END ASC,    

    

    

    

 CASE WHEN @SortCol = 7  AND @SortDIR = 'ASC' THEN Dam  END ASC,    

    

    

    

 CASE WHEN @SortCol = 8  AND @SortDIR = 'ASC' THEN DNA END ASC,    

    

    

    

 CASE WHEN @SortCol = 9  AND @SortDIR = 'ASC' THEN Status  END ASC,    

    

    

    

 CASE WHEN @SortCol = 10  AND @SortDIR = 'ASC' THEN Lastupdate  END ASC,    

    

    

    

 case when @SortCol = 11 and @SortDir = 'ASC' then r.pbs_id end asc,    

    

    

    

 CASE WHEN @SortCol = 1  AND @SortDIR = 'DESC' THEN r.RegNo END DESC,    

    

    

    

 CASE WHEN @SortCol = 2  AND @SortDIR = 'DESC' THEN Animal  END DESC,    

    

    

    

 CASE WHEN @SortCol = 3  AND @SortDIR = 'DESC'  THEN PrivateHerd  END DESC,    

    

    

    

 CASE WHEN @SortCol = 4  AND @SortDIR = 'DESC' THEN TypeService END DESC,    

    

    

    

 CASE WHEN @SortCol = 5  AND @SortDIR = 'DESC' THEN Birthdate  END DESC,    

    

    

    

 CASE WHEN @SortCol = 6  AND @SortDIR = 'DESC' THEN Sire  END DESC,    

    

    

    

 CASE WHEN @SortCol = 7  AND @SortDIR = 'DESC' THEN Dam  END DESC,    

    

    

    

 CASE WHEN @SortCol = 8  AND @SortDIR = 'DESC' THEN DNA  END DESC,    

    

    

    

 CASE WHEN @SortCol = 9  AND @SortDIR = 'DESC' THEN Status  END DESC,    

    

    

    

 CASE WHEN @SortCol = 10  AND @SortDIR = 'DESC' THEN Lastupdate  END DESC,    

    

    

    

 case when @SortCol = 11  and @SortDir = 'DESC' then r.pbs_id end DESC    

    

    

    

END    

    

    

    

IF @Iteminv = 1 and @Itempre =1 and @Itemprt is null and @Itememail is null and @ItemFailedtest is null    

    

BEGIN    

    

 SELECT r.ID, r.RegNo, Animal, PrivateHerd, TypeService, Birthdate,     

    

    

    

 Sire, Dam, DNA, Status, Lastupdate, sold,    

    

    

    

 case when sold = 1 then 'Sold' else    

    

    

    

 isnull(membername, lastname + ', ' + firstname) end as MemberName, r.memberno    

    

    

    

 FROM Registration r    

    

    

    

 left join Registrationhistory rh on r.regno = rh.regno and  rh.prevmember = @MemberNumber    

    

    

    

 join members m on r.memberno = m.membernumber    

    

    

    

 WHERE (r.memberno = @MemberNumber and sold = 1) or (r.memberno <> @MemberNumber and rh.prevmember is not null)    

    

    

    

 ORDER BY     

    

    

    

 CASE WHEN @SortCol = 1  AND @SortDIR = 'ASC' THEN r.RegNo END ASC,    

    

    

    

 CASE WHEN @SortCol = 2  AND @SortDIR = 'ASC' THEN Animal  END ASC,    

    

    

    

 CASE WHEN @SortCol = 3  AND @SortDIR = 'ASC'  THEN PrivateHerd  END ASC,    

    

    

    

 CASE WHEN @SortCol = 4  AND @SortDIR = 'ASC' THEN TypeService END ASC,    

    

    

    

 CASE WHEN @SortCol = 5  AND @SortDIR = 'ASC' THEN Birthdate  END ASC,    

    

    

    

 CASE WHEN @SortCol = 6  AND @SortDIR = 'ASC' THEN Sire  END ASC,    

    

    

    

 CASE WHEN @SortCol = 7  AND @SortDIR = 'ASC' THEN Dam  END ASC,    

    

    

    

 CASE WHEN @SortCol = 8  AND @SortDIR = 'ASC' THEN DNA END ASC,    

    

    

    

 CASE WHEN @SortCol = 9  AND @SortDIR = 'ASC' THEN Status  END ASC,    

    

    

    

 CASE WHEN @SortCol = 10  AND @SortDIR = 'ASC' THEN Lastupdate  END ASC,    

    

    

    

 case when @SortCol = 11 and @SortDir = 'ASC' then pbs_id end asc,    

    

    

    

 CASE WHEN @SortCol = 12  AND @SortDIR = 'ASC' THEN isnull(membername, lastname + ', ' + firstname)  END ASC,    

    

    

    

 CASE WHEN @SortCol = 13  AND @SortDIR = 'ASC' THEN sold  END ASC,    

    

    

    

     

    

    

    

 CASE WHEN @SortCol = 1  AND @SortDIR = 'DESC' THEN r.RegNo END DESC,    

    

    

    

 CASE WHEN @SortCol = 2  AND @SortDIR = 'DESC' THEN Animal  END DESC,    

    

    

    

 CASE WHEN @SortCol = 3  AND @SortDIR = 'DESC'  THEN PrivateHerd  END DESC,    

    

    

    

 CASE WHEN @SortCol = 4  AND @SortDIR = 'DESC' THEN TypeService END DESC,    

    

    

    

 CASE WHEN @SortCol = 5  AND @SortDIR = 'DESC' THEN Birthdate  END DESC,    

    

    

    

 CASE WHEN @SortCol = 6  AND @SortDIR = 'DESC' THEN Sire  END DESC,    

    

    

    

 CASE WHEN @SortCol = 7  AND @SortDIR = 'DESC' THEN Dam  END DESC,    

    

    

    

 CASE WHEN @SortCol = 8  AND @SortDIR = 'DESC' THEN DNA  END DESC,    

    

    

    

 CASE WHEN @SortCol = 9  AND @SortDIR = 'DESC' THEN Status  END DESC,    

    

    

    

 CASE WHEN @SortCol = 10  AND @SortDIR = 'DESC' THEN Lastupdate  END DESC,    

    

    

    

 case when @SortCol = 11  and @SortDir = 'DESC' then pbs_id end DESC,    

    

    

    

 CASE WHEN @SortCol = 12  AND @SortDIR = 'DESC' THEN isnull(membername, lastname + ', ' + firstname)  END DESC,    

    

    

    

 case when @SortCol = 13  and @SortDir = 'DESC' then sold end DESC    

    

END    

    

IF @Iteminv = 1 and @Itempre =1 and @Itemprt=1 and @Itememail is null and @ItemFailedtest is null    

BEGIN    

 SELECT ContactID, LastName + ', ' + FirstName AS PartnersNames, Email, Address, City, State, Zip, Country, Phone, CellPhone FROM Members_Partners     

     

 WHERE (MemberNumber =@MemberNumber) ORDER BY LastName, FirstName    

END    

    

IF @Iteminv = 1 and @Itempre =1 and @Itemprt=1 and @Itememail =1 and @ItemFailedtest is null    

BEGIN    

 SELECT Outbox.OutboxID, SentDate, Members_1.FirstName + ' ' + Members_1.LastName AS SentToMember, Members.FirstName + ' ' + Members.LastName AS SentByMember, Outbox.Message    

 FROM Outbox INNER JOIN Members ON Outbox.SentBy = Members.MemberNumber    

 INNER JOIN Members Members_1 ON Outbox.SentTo = Members_1.MemberNumber     

 Where ((SentBy = @MemberNumber) OR (SentTo = @MemberNumber))    

END    

IF @Iteminv = 1 and @Itempre =1 and @Itemprt=1 and @Itememail =1 and @ItemFailedtest =1    

BEGIN    

 SELECT AnimalID, DateCreated, DateSent FROM EmailOutbox WHERE MemberID = @MemberNumber  ORDER BY DateSent, DateCreated    

END    



IF @ItemchangeP=1 

BEGIN

	UPDATE Members SET FirstName = @FirstName, LastName = @LastName, RanchName = @RanchName, Address = @Address, City = @City, State = @State, Zip = @Zip, Country = @Country, Phone = @Phone, Email = @Email, 

		   Office = @Office, Fax = @Fax, Website = @Website, PremiseID = @PremiseID, HideContactInfo = @HideContactInfo, NewsletterPromotion = @NewsletterPromotion, BulkEmailFail = @BulkEmailFail, 

		   updated = @Updated, UpdatedBy = @UpdatedBy WHERE MemberNumber =@MemberNumber

END

SET NOCOUNT OFF    
Go

Grant Execute on _MemberSelectInsertUpdate1 to ABBI_DEV

GO

If exists(select * from sys.objects where name='_SearchMember' and type='P')
Drop procedure _SearchMember
Go
 -- modified by ramaK on 25-01-2021 to show firstname and lastname on screen .

CREATE  PROCEDURE [dbo].[_SearchMember] 



(



	@Page int = 1,  

  

        @RecsPerPage int = 600000000,  

  

 @FirstName nvarchar(255) = null,  

  

 @Lastname nvarchar(255) = null,  

  

 @MemberName nvarchar(255) = null,  

  

 @MemberNumber int = null,  

  

 @RanchName nvarchar(255) = null,    

  

 @Address nvarchar(255) = null,   

  

 @City nvarchar(255) = null,   

  

 @State nvarchar(255) = null,   

  

 @Zip nvarchar(255) = null,   

  

 @Country nvarchar(255) = null,   

  

 @Phone nvarchar(255) = null,   

  

 @AltPhone nvarchar(255) = null,  

  

 @JoinDate datetime = null,   

  

 @DueDate datetime = null,   

  

 @PaidDate datetime = null,   

  

 @Email nvarchar(255) = null,   

  

 @Type  nvarchar(255) = null,  

  

  @Inactive int = null,  

  

 @Notes  nvarchar(255) = null,   

  

 @Updated datetime = null,   

  

 @Updatedby  nvarchar(50) = null,   

  

 @Office  nvarchar(50) = null,   

  

 @Fax nvarchar(50) = null,  

  

 @SortCol int = 1,   

  

 @SortDIR nvarchar(5) = 'ASC'  

  

)  

  

AS  

  

  

  

SET NOCOUNT ON  

  

  

  

DECLARE @RecCount int  

  

SELECT @RecCount = @RecsPerPage * @Page + 1  

  

  

  

CREATE TABLE #TempItems  

  

(  

  

 SID int IDENTITY,  

  

 MemberNumber int,   

  

 FirstName nvarchar(255),  

  

 LastName nvarchar(255),  

  

 MemberName nvarchar(255),   

  

 RanchName nvarchar(255),   

  

 UserName nvarchar(255),  

  

 Password nvarchar(255),  

  

 Address nvarchar(255),   

  

 City nvarchar(255),   

  

 State nvarchar(255),  

   

 Country nvarchar(255),   

  

 Zip nvarchar(255),   

  

 Phone nvarchar(255),   

  

 AltPhone nvarchar(255),    

  

 JoinDate nvarchar(255),   

  

 DueDate nvarchar(255),   

  

 PaidDate nvarchar(255),   

  

 Email nvarchar(255),   

  

 Type nvarchar(255),   

  

 Notes nvarchar(255),   

  

 updated nvarchar(255),   

  

 Updatedby nvarchar(255),   

  

 Office nvarchar(255),   

  

 Fax  nvarchar(255)  

  

  

  

)  

  

  

  

-- Insert the rows from tblItems into the temp. table  

  

INSERT INTO #TempItems (MemberNumber, FirstName,LastName, MemberName, RanchName,UserName,Password, Address, City, State, Country, Zip, Phone, AltPhone, JoinDate, DueDate, PaidDate, Email, Type, Notes, updated, Updatedby, Office, Fax )  

  

SELECT   

  

 MemberNumber,   

  

 FirstName,  

  

 LastName,  

  

 LastName + ', ' + FirstName AS MemberName,   

  

 RanchName,   

  

 UserName,  

  

 Password,  

  

 Address,   

  

 City,   

  

 State,   

  

 Country,  

  

 Zip,   

  

 Phone,   

  

 AltPhone,   

  

 JoinDate,   

  

 DueDate,   

  

 PaidDate,   

  

 Email,   

  

 Type,   

  

 Notes,   

  

 updated,   

  

 Updatedby,   

  

 Office,   

  

 Fax   

  

FROM Members   

  

WHERE   

  

(((@MemberName IS NULL) OR (FirstName LIKE '%' + @MemberName + '%') OR (LastName LIKE '%' + @MemberName + '%'))  

  

AND ((@MemberNumber IS NULL) OR (MemberNumber = @MemberNumber))  

  

AND ((@RanchName IS NULL) OR (RanchName LIKE '%' + @RanchName + '%'))  

  

AND ((@Address IS NULL) OR (Address LIKE '%' + @Address + '%'))  

  

AND ((@City IS NULL) OR (City LIKE '%' + @City + '%'))  

  

AND ((@State IS NULL) OR (State LIKE '%' + @State + '%'))  

  

AND ((@Zip IS NULL) OR (Zip LIKE '%' + @Zip + '%'))  

  

AND ((@Country IS NULL) OR (Country = @Country))  

  

AND ((@Phone IS NULL) OR (Phone LIKE '%' + @Phone + '%'))  

  

AND ((@AltPhone IS NULL) OR (AltPhone LIKE '%' + @AltPhone + '%'))  

  

AND ((@JoinDate IS NULL) OR (JoinDate = @JoinDate))  

  

AND ((@DueDate IS NULL) OR (DueDate = @DueDate))  

  

AND ((@PaidDate IS NULL) OR (PaidDate = @PaidDate))  

  

AND ((@Email IS NULL) OR (Email LIKE '%' + @Email + '%'))  

  

AND ((@Type IS NULL) OR (Type LIKE '%' + @Type + '%'))  

  

AND ((@Inactive IS NULL) OR (inactive = @Inactive))  

  

AND ((@Notes IS NULL) OR (Notes LIKE '%' + @Notes + '%'))  

  

AND ((@Updated IS NULL) OR (Updated = @Updated))  

  

AND ((@Updatedby IS NULL) OR (Updatedby LIKE '%' + @Updatedby + '%'))  

  

AND ((@Office IS NULL) OR (Office LIKE '%' + @Office + '%'))  

  

AND ((@Fax IS NULL) OR (Fax LIKE '%' + @Fax + '%')))  

  

ORDER BY   

  

CASE WHEN @SortCol = 1  AND @SortDIR = 'ASC' THEN MemberNumber END ASC,  

  

CASE WHEN @SortCol = 2  AND @SortDIR = 'ASC' THEN MemberName END ASC,  

  

CASE WHEN @SortCol = 3  AND @SortDIR = 'ASC'  THEN RanchName  END ASC,  

  

CASE WHEN @SortCol = 4  AND @SortDIR = 'ASC' THEN Email END ASC,  

  

CASE WHEN @SortCol = 5  AND @SortDIR = 'ASC' THEN Type  END ASC,  

  

CASE WHEN @SortCol = 1  AND @SortDIR = 'DESC' THEN MemberNumber END DESC,  

  

CASE WHEN @SortCol = 2  AND @SortDIR = 'DESC' THEN MemberName  END DESC,  

  

CASE WHEN @SortCol = 3  AND @SortDIR = 'DESC'  THEN RanchName  END DESC,  

  

CASE WHEN @SortCol = 4  AND @SortDIR = 'DESC' THEN Email END DESC,  

  

CASE WHEN @SortCol = 5  AND @SortDIR = 'DESC' THEN Type END DESC  

  

  

  

-- Find out the first and last record we want  

  

DECLARE @FirstRec int, @LastRec int  

  

SELECT @FirstRec = (@Page - 1) * @RecsPerPage   

  

SELECT @LastRec = (@Page * @RecsPerPage + 1)  

  

  

  

-- Now, return the set of paged records, plus, an indiciation of we have more records or not!  

  

SELECT *,  

  

  

  

       MoreRecords =   

  

  

  

            (  

  

  

  

             SELECT COUNT(SID)   

  

  

  

             FROM #TempItems TI  

  

  

  

             WHERE TI.SID > @LastRec  

  

  

  

            ),  

  

  

  

               xCount =   

  

  

  

            (  

  

  

  

             SELECT COUNT(SID)   

  

  

  

             FROM #TempItems TI  

  

  

  

            )   

  

FROM #TempItems  

  

WHERE SID > @FirstRec AND SID < @LastRec  

  

  

  

-- Turn NOCOUNT back OFF  

  

SET NOCOUNT OFF  
Go

Grant Execute on _SearchMember to ABBI_DEV

GO

 
If exists(select * from sys.objects where name='_MemberListing' and type='P')
Drop procedure _MemberListing
Go
 -- modified by ramaK on 23-01-2021 to show the action column details on grid.



CREATE PROCEDURE [dbo].[_MemberListing] 



(



	@Page int = 1,



       	@RecsPerPage int = 600000000,



	@SearchItem nvarchar(250) = null,



	@memberNumber int = null,



	@type nvarchar(250) = null,



	@SortCol int = 1, 



	@SortDIR nvarchar(5) = 'ASC',



	@inactive int = null



)



AS







SET NOCOUNT ON







DECLARE @RecCount int



SELECT @RecCount = @RecsPerPage * @Page + 1







CREATE TABLE #TempItems



(



	SID int IDENTITY,



	MemberNumber int,



	MemberName nvarchar(250),



	RanchName nvarchar(250),



	Phone nvarchar(250),



	Email nvarchar(250),



	Inactive int,

	

	action int



)







-- Insert the rows from tblItems into the temp. table



INSERT INTO #TempItems (MemberNumber, MemberName, RanchName, Phone, Email, Inactive,action)



SELECT MemberNumber, LastName + ', ' + FirstName AS MemberName, RanchName, Phone, Email, Inactive

,dbo.fn_showaction_onGrid(M.MemberNumber) --added by ramaK



FROM Members M



WHERE



(((@SearchItem IS NULL) OR (LastName LIKE '%' + @SearchItem + '%') OR (FirstName LIKE '%' + @SearchItem + '%') OR (RanchName LIKE '%' + @SearchItem + '%'))



AND ((@type IS NULL) OR (Type = @type))



AND ((@memberNumber IS NULL) OR (MemberNumber = @MemberNumber))



AND ((@inactive IS NULL) OR (Inactive = @inactive))



)



ORDER BY 



CASE WHEN @SortCol = 1  AND @SortDIR = 'ASC' THEN MemberNumber END ASC,



CASE WHEN @SortCol = 2  AND @SortDIR = 'ASC' THEN LastName + ', ' + FirstName  END ASC,



CASE WHEN @SortCol = 3  AND @SortDIR = 'ASC'  THEN RanchName  END ASC,



CASE WHEN @SortCol = 4  AND @SortDIR = 'ASC' THEN Phone  END ASC,



CASE WHEN @SortCol = 5  AND @SortDIR = 'ASC' THEN Email  END ASC,



CASE WHEN @SortCol = 1  AND @SortDIR = 'DESC' THEN MemberNumber END DESC,



CASE WHEN @SortCol = 2  AND @SortDIR = 'DESC' THEN LastName + ', ' + FirstName END DESC,



CASE WHEN @SortCol = 3  AND @SortDIR = 'DESC'  THEN RanchName  END DESC,



CASE WHEN @SortCol = 4  AND @SortDIR = 'DESC' THEN Phone  END DESC,



CASE WHEN @SortCol = 5  AND @SortDIR = 'DESC' THEN Email  END DESC







-- Find out the first and last record we want



DECLARE @FirstRec int, @LastRec int



SELECT @FirstRec = (@Page - 1) * @RecsPerPage



SELECT @LastRec = (@Page * @RecsPerPage + 1)







-- Now, return the set of paged records, plus, an indiciation of we have more records or not!



SELECT *,







       MoreRecords = 







            (







             SELECT COUNT(SID) 







             FROM #TempItems TI







             WHERE TI.SID > @LastRec







            ),







               xCount = 







            (







             SELECT COUNT(SID) 







             FROM #TempItems TI







            ) 



FROM #TempItems



WHERE SID > @FirstRec AND SID < @LastRec







-- Turn NOCOUNT back OFF



SET NOCOUNT OFF
Go

Grant Execute on _MemberListing to ABBI_DEV

GO

If exists(select * from sys.objects where name='_changepassword' and type='P')
Drop procedure _changepassword
Go
--created by ramaK on 22-01-2021 for change password screen

create procedure _changepassword

(

@password nvarchar(255),

@membernumber int=null

)

as

begin

update Members set Password=@password where MemberNumber=@membernumber;

end
Go

Grant Execute on _changepassword to ABBI_DEV

GO      

If exists(select * from sys.objects where name='usp_InventoryList_ALL' and type='P')
Drop procedure usp_InventoryList_ALL
Go

--updated by ramak on 20210121.. 


CREATE PROCEDURE [dbo].[usp_InventoryList_ALL] 



(



	@Page int = 1,



       	@RecsPerPage int = 600000000,



	@MemberNumber int = null,



	@SearchStatus nvarchar(255) = null,



	@SearchItem nvarchar(255) = null,



	@regno int = null,



	@searchDate datetime = null,



	@SortCol int = 1, 



	@SortDIR nvarchar(5) = 'ASC'



)



AS







SET NOCOUNT ON







DECLARE @RecCount int



SELECT @RecCount = @RecsPerPage * @Page + 1







CREATE TABLE #TempItems



(



	SID int IDENTITY,



	RegNo int,



	Animal nvarchar(255),



	PrivateHerd nvarchar(255),



	Birthdate datetime,



	Sex nvarchar(250),



	SireName int,



	DamName int,



	MemberNumber int,



	MemberName nvarchar(255),



	Status nvarchar(255),



	LastUpdated datetime



)







-- Insert the rows from tblItems into the temp. table



INSERT INTO #TempItems (RegNo, Animal, PrivateHerd, Birthdate, Sex, SireName, DamName, MemberNumber, MemberName, Status, LastUpdated)



SELECT 



	Registration.RegNo, 



	Registration.Animal,



	Registration.PrivateHerd,



	Registration.Birthdate,



	Registration.TypeService,



	Registration.Sire,



	Registration.Dam, 



	MemberNumber,



	Members.LastName + ', ' + Members.FirstName AS MemberName,



	Registration.Status,



	Registration.Lastupdate



FROM Registration



INNER JOIN Members ON Registration.MemberNo = Members.MemberNumber



where Members.MemberNumber=@MemberNumber





INSERT INTO #TempItems (RegNo, Animal, PrivateHerd, Birthdate, Sex, SireName, DamName, MemberNumber, MemberName, Status, LastUpdated)



SELECT 



	RegistrationHistory.RegNo, 



	Registration.Animal,



	Registration.PrivateHerd,



	Registration.Birthdate,



	Registration.TypeService,



	Registration.Sire,



	Registration.Dam, 



	MemberNumber,



	Members.LastName + ', ' + Members.FirstName AS MemberName,



	Registration.Status,



	Registration.Lastupdate



FROM RegistrationHistory



INNER JOIN Registration ON Registration.RegNo = RegistrationHistory.RegNo



INNER JOIN Members ON RegistrationHistory.PrevMember = Members.MemberNumber







WHERE



(((Members.MemberNumber = @MemberNumber) AND (RegistrationHistory.PrevMember = @MemberNumber)))



--AND (((Registration.RegNo = @regno) OR (Registration.Sire = @regno) OR (Registration.Dam = @regno))



--AND ((@SearchItem = NULL) OR (Animal LIKE '%' + @SearchItem + '%') OR (PrivateHerd LIKE '%' + @SearchItem + '%') OR (TypeService LIKE '%' + @SearchItem + '%') OR (Status LIKE '%' + @SearchItem + '%'))



--AND ((@SearchStatus = NULL) OR (Registration.Status = @SearchStatus)))



--AND ((@searchDate = NULL) OR (Registration.Birthdate = @searchDate) OR (Registration.Lastupdate = @searchDate)))



--AND ((RegistrationHistory.Regno=Registration.RegNo)))



ORDER BY 







CASE WHEN @SortCol = 1  AND @SortDIR = 'ASC' THEN Registration.RegNo END ASC,



CASE WHEN @SortCol = 2  AND @SortDIR = 'ASC' THEN Registration.Animal  END ASC,



CASE WHEN @SortCol = 3  AND @SortDIR = 'ASC' THEN Registration.PrivateHerd  END ASC,



CASE WHEN @SortCol = 4  AND @SortDIR = 'ASC' THEN Registration.Birthdate  END ASC,



CASE WHEN @SortCol = 5  AND @SortDIR = 'ASC' THEN Registration.TypeService  END ASC,



CASE WHEN @SortCol = 6  AND @SortDIR = 'ASC' THEN Registration.Sire  END ASC,



CASE WHEN @SortCol = 7  AND @SortDIR = 'ASC' THEN Registration.Dam END ASC,



CASE WHEN @SortCol = 8  AND @SortDIR = 'ASC' THEN LastName + ', ' + FirstName  END ASC,



CASE WHEN @SortCol = 9  AND @SortDIR = 'ASC' THEN Registration.Status  END ASC,



CASE WHEN @SortCol = 10 AND @SortDIR = 'ASC' THEN Registration.Lastupdate  END ASC,



CASE WHEN @SortCol = 11 AND @SortDIR = 'ASC' THEN Registration.ID END ASC,



CASE WHEN @SortCol = 1  AND @SortDIR = 'DESC' THEN Registration.RegNo END DESC,



CASE WHEN @SortCol = 2  AND @SortDIR = 'DESC' THEN Registration.Animal  END DESC,



CASE WHEN @SortCol = 3  AND @SortDIR = 'DESC' THEN Registration.PrivateHerd  END DESC,



CASE WHEN @SortCol = 4  AND @SortDIR = 'DESC' THEN Registration.Birthdate  END DESC,



CASE WHEN @SortCol = 5  AND @SortDIR = 'DESC' THEN Registration.TypeService  END DESC,



CASE WHEN @SortCol = 6  AND @SortDIR = 'DESC' THEN Registration.Sire  END DESC,



CASE WHEN @SortCol = 7  AND @SortDIR = 'DESC' THEN Registration.Dam  END DESC,
CASE WHEN @SortCol = 8  AND @SortDIR = 'DESC' THEN LastName + ', ' + FirstName  END DESC,



CASE WHEN @SortCol = 9  AND @SortDIR = 'DESC' THEN Registration.Status  END DESC,



CASE WHEN @SortCol = 10 AND @SortDIR = 'DESC' THEN Registration.Lastupdate  END DESC,



CASE WHEN @SortCol = 11 AND @SortDIR = 'DESC' THEN Registration.ID END DESC











-- Find out the first and last record we want



DECLARE @FirstRec int, @LastRec int



SELECT @FirstRec = (@Page - 1) * @RecsPerPage



SELECT @LastRec = (@Page * @RecsPerPage + 1)







-- Now, return the set of paged records, plus, an indiciation of we have more records or not!



SELECT *,







       MoreRecords = 







            (







             SELECT COUNT(SID) 







             FROM #TempItems TI







             WHERE TI.SID > @LastRec







            ),







               xCount = 







            (







             SELECT COUNT(SID) 







             FROM #TempItems TI







            ) 



FROM #TempItems



WHERE SID > @FirstRec AND SID < @LastRec







-- Turn NOCOUNT back OFF



SET NOCOUNT OFF
Go

Grant Execute on usp_InventoryList_ALL to ABBI_DEV

GO



If exists(select * from sys.objects where name='_MemberSelectInsertUpdate' and type='P')
Drop procedure _MemberSelectInsertUpdate
Go
-------------------------------------------------  
  --updated by ramak on 20210119 for change profile screen



CREATE PROCEDURE [dbo].[_MemberSelectInsertUpdate]   



(  



 @Item int,  



 @MemberNumber int = null,  



 @FirstName nvarchar(255) = null,   



 @LastName nvarchar(255) = null,   



 @RanchName nvarchar(255) = null,    



 @Address nvarchar(255) = null,   



 @City nvarchar(255) = null,   



 @State nvarchar(255) = null,   



 @Zip nvarchar(255) = null,   



 @Country nvarchar(255) = null,  



 @Phone nvarchar(255) = null,   



 @AltPhone nvarchar(255) = null,   



 @JoinDate datetime = null,   



 @DueDate datetime = null,   



 @PaidDate datetime = null,   



 @Email nvarchar(255) = null,   



 @Birthdate datetime = null,   



 @Type  nvarchar(255) = null,   



 @Notes  nvarchar(255) = null,   



 @Updated datetime = null,   



 @Updatedby  nvarchar(50) = null,   



 @Office  nvarchar(50) = null,   



 @Fax nvarchar(50) = null,  



 @Website varchar(500) = null,  



 @UserName nvarchar(250) = null,  



 @Password nvarchar(250) = null,  



 @Inactive int = 0,  



 @AlternateAccount bit = 0,  



    @PremiseID nvarchar(12) = null,  



 @SortCol int = 1,   



 @SortDIR nvarchar(5) = 'ASC'  



)  



AS  



  



SET NOCOUNT ON  



  



IF @Item = 1  



 SELECT MemberNumber, FirstName, LastName, MemberName, RanchName, Address, City, State, Zip, Country, Phone, AltPhone  



         , JoinDate, DueDate, PaidDate, Email, MemberBirthdate, Type, Notes, updated, Updatedby, Office, Fax, Website  



         , UserName, Password, Inactive, AlternateAccount, PremiseID  



 FROM Members   



 WHERE (MemberNumber = @MemberNumber)  



  



IF @Item = 2   



 INSERT INTO Members (MemberNumber, FirstName, LastName, RanchName, MemberName, Address, City, State, Zip, Country, Phone, AltPhone  



                        , JoinDate, DueDate, PaidDate, Email, MemberBirthdate, Type, Notes, Updated, Updatedby, Office, Fax, Website  



                        , Prt, UserName, Password, OriginalBreeder, Inactive, AlternateAccount, PremiseID)  



 Values (@MemberNumber, @FirstName, @LastName, @RanchName, @LastName + ', ' + @FirstName, @Address, @City, @State, @Zip, @Country, @Phone, @AltPhone  



           , @JoinDate, @DueDate, @PaidDate, @Email, @Birthdate, @Type, @Notes, @Updated, @Updatedby, @Office, @Fax, @Website  



           , 0, @UserName, @Password, @MemberNumber, @Inactive, @AlternateAccount, @PremiseID)  



  



IF @Item = 3  



 UPDATE Members   



       SET FirstName = @FirstName, LastName = @LastName, RanchName = @RanchName, MemberName = @LastName + ', ' + @FirstName  



         , Address = @Address, City = @City, State = @State, Zip = @Zip, Country = @Country  



         , Phone = @Phone



         , Email = @Email



         , Office = @Office, Fax = @Fax, Website = @Website,  PremiseID = @PremiseID  



 WHERE MemberNumber = @MemberNumber  



  



IF @Item = 4  



 SELECT ID, r.RegNo, Animal, PrivateHerd, TypeService, Birthdate, Sire, Dam, DNA, Status, Lastupdate, r.pbs_id, outcount, avgmark   



 FROM Registration r  



 left join bullstats bs on r.pbs_id = bs.pbs_id  



 WHERE (MemberNo = @MemberNumber)  



 and sold=0  



 ORDER BY   



 CASE WHEN @SortCol = 1  AND @SortDIR = 'ASC' THEN r.RegNo END ASC,  



 CASE WHEN @SortCol = 2  AND @SortDIR = 'ASC' THEN Animal  END ASC,  



 CASE WHEN @SortCol = 3  AND @SortDIR = 'ASC'  THEN PrivateHerd  END ASC,  



 CASE WHEN @SortCol = 4  AND @SortDIR = 'ASC' THEN TypeService END ASC,  



 CASE WHEN @SortCol = 5  AND @SortDIR = 'ASC' THEN Birthdate  END ASC,  



 CASE WHEN @SortCol = 6  AND @SortDIR = 'ASC' THEN Sire  END ASC,  



 CASE WHEN @SortCol = 7  AND @SortDIR = 'ASC' THEN Dam  END ASC,  



 CASE WHEN @SortCol = 8  AND @SortDIR = 'ASC' THEN DNA END ASC,  



 CASE WHEN @SortCol = 9  AND @SortDIR = 'ASC' THEN Status  END ASC,  



 CASE WHEN @SortCol = 10  AND @SortDIR = 'ASC' THEN Lastupdate  END ASC,  



 case when @SortCol = 11 and @SortDir = 'ASC' then r.pbs_id end asc,  



 CASE WHEN @SortCol = 1  AND @SortDIR = 'DESC' THEN r.RegNo END DESC,  



 CASE WHEN @SortCol = 2  AND @SortDIR = 'DESC' THEN Animal  END DESC,  



 CASE WHEN @SortCol = 3  AND @SortDIR = 'DESC'  THEN PrivateHerd  END DESC,  



 CASE WHEN @SortCol = 4  AND @SortDIR = 'DESC' THEN TypeService END DESC,  



 CASE WHEN @SortCol = 5  AND @SortDIR = 'DESC' THEN Birthdate  END DESC,  



 CASE WHEN @SortCol = 6  AND @SortDIR = 'DESC' THEN Sire  END DESC,  



 CASE WHEN @SortCol = 7  AND @SortDIR = 'DESC' THEN Dam  END DESC,  



 CASE WHEN @SortCol = 8  AND @SortDIR = 'DESC' THEN DNA  END DESC,  



 CASE WHEN @SortCol = 9  AND @SortDIR = 'DESC' THEN Status  END DESC,  



 CASE WHEN @SortCol = 10  AND @SortDIR = 'DESC' THEN Lastupdate  END DESC,  



 case when @SortCol = 11  and @SortDir = 'DESC' then r.pbs_id end DESC  



  



IF @Item = 5  



 SELECT r.ID, r.RegNo, Animal, PrivateHerd, TypeService, Birthdate,   



 Sire, Dam, DNA, Status, Lastupdate, sold,  



 case when sold = 1 then 'Sold' else  



 isnull(membername, lastname + ', ' + firstname) end as MemberName, r.memberno  



 FROM Registration r  



 left join Registrationhistory rh on r.regno = rh.regno and  rh.prevmember = @MemberNumber  



 join members m on r.memberno = m.membernumber  



 WHERE (r.memberno = @MemberNumber and sold = 1) or (r.memberno <> @MemberNumber and rh.prevmember is not null)  



 ORDER BY   



 CASE WHEN @SortCol = 1  AND @SortDIR = 'ASC' THEN r.RegNo END ASC,  



 CASE WHEN @SortCol = 2  AND @SortDIR = 'ASC' THEN Animal  END ASC,  



 CASE WHEN @SortCol = 3  AND @SortDIR = 'ASC'  THEN PrivateHerd  END ASC,  



 CASE WHEN @SortCol = 4  AND @SortDIR = 'ASC' THEN TypeService END ASC,  



 CASE WHEN @SortCol = 5  AND @SortDIR = 'ASC' THEN Birthdate  END ASC,  



 CASE WHEN @SortCol = 6  AND @SortDIR = 'ASC' THEN Sire  END ASC,  



 CASE WHEN @SortCol = 7  AND @SortDIR = 'ASC' THEN Dam  END ASC,  



 CASE WHEN @SortCol = 8  AND @SortDIR = 'ASC' THEN DNA END ASC,  



 CASE WHEN @SortCol = 9  AND @SortDIR = 'ASC' THEN Status  END ASC,  



 CASE WHEN @SortCol = 10  AND @SortDIR = 'ASC' THEN Lastupdate  END ASC,  



 case when @SortCol = 11 and @SortDir = 'ASC' then pbs_id end asc,  



 CASE WHEN @SortCol = 12  AND @SortDIR = 'ASC' THEN isnull(membername, lastname + ', ' + firstname)  END ASC,  



 CASE WHEN @SortCol = 13  AND @SortDIR = 'ASC' THEN sold  END ASC,  



   



 CASE WHEN @SortCol = 1  AND @SortDIR = 'DESC' THEN r.RegNo END DESC,  



 CASE WHEN @SortCol = 2  AND @SortDIR = 'DESC' THEN Animal  END DESC,  



 CASE WHEN @SortCol = 3  AND @SortDIR = 'DESC'  THEN PrivateHerd  END DESC,  



 CASE WHEN @SortCol = 4  AND @SortDIR = 'DESC' THEN TypeService END DESC,  



 CASE WHEN @SortCol = 5  AND @SortDIR = 'DESC' THEN Birthdate  END DESC,  



 CASE WHEN @SortCol = 6  AND @SortDIR = 'DESC' THEN Sire  END DESC,  



 CASE WHEN @SortCol = 7  AND @SortDIR = 'DESC' THEN Dam  END DESC,  



 CASE WHEN @SortCol = 8  AND @SortDIR = 'DESC' THEN DNA  END DESC,  



 CASE WHEN @SortCol = 9  AND @SortDIR = 'DESC' THEN Status  END DESC,  



 CASE WHEN @SortCol = 10  AND @SortDIR = 'DESC' THEN Lastupdate  END DESC,  



 case when @SortCol = 11  and @SortDir = 'DESC' then pbs_id end DESC,  



 CASE WHEN @SortCol = 12  AND @SortDIR = 'DESC' THEN isnull(membername, lastname + ', ' + firstname)  END DESC,  



 case when @SortCol = 13  and @SortDir = 'DESC' then sold end DESC  


 
SET NOCOUNT OFF  
Go

Grant Execute on _MemberSelectInsertUpdate to ABBI_DEV

GO

IF Exists(Select * from Sys.objects where name='_InsTempCart' and type='P')
Drop Procedure _InsTempCart
Go

/*
Created By RamaKrishna on 02/06/2021 to store the user choices in online store. 
*/

Create Procedure _InsTempCart
(
	@MEMBERNO INT,
	@ProductID int = NULL,
	@ProductCategory nvarchar(200)= NULL,
	@ProductCode nvarchar(200)= NULL,
	@Product nvarchar(200)= NULL,
	@Price money =0.00,
	@TotalPrice money= 0.00,
	@Qty int =0 
)
AS
BEGIN
	DECLARE @Cnt int
	SELECT @Cnt= Count(ProductID) From TempCart 
	WHERE MEMBERNO= @MEMBERNO AND ProductID=@ProductID AND ProductCode=@ProductCode;
	
	IF @Cnt>0
	BEGIN
		UPDATE TempCart set Qty=Qty+1,TotalPrice=(Qty+1)*Price 
		Where MEMBERNO=@MemberNo AND ProductID=@ProductId AND ProductCode=@ProductCode
	END
	ELSE
	BEGIN
		INSERT INTO TempCart 
		VALUES(@MEMBERNO,@ProductID,@ProductCategory,@ProductCode,@Product,@Price,@TotalPrice,@Qty)
	END

END
Go
Grant Execute On _InsTempCart to ABBI_DEV
Go
IF Exists(Select * from sys.objects where name='_SearchAnimals_Front' and Type='P')
Drop Procedure _SearchAnimals_Front
Go
CREATE        PROCEDURE [dbo].[_SearchAnimals_Front]   
  
(  
  
 @Page int = 1,  
  
        @RecsPerPage int = 600000000,  
  
 @RegNo int = null,  
  
 @MemberNumber int = null,  
  
 @RanchName nvarchar(255) = null,  
  
 @Animal nvarchar(255) = null,  
  
 @TypeService nvarchar(255) = null,  
  
 @PrivateHerd nvarchar(255) = null,  
  
 @Birthdate datetime = null,  
  
 @Description nvarchar(255) = null,  
  
 @Horns nvarchar(255) = null,  
  
 @Status nvarchar(255) = null,  
  
 @Dateregistered datetime = null,  
  
 @BreedersCertificateOnly bit = 0,  
  
 @SuperStakesOnly bit = 0,  
  
 @SortCol int = 1,   
  
 @SortDIR nvarchar(5) = 'ASC'  
  
)  
  
AS  
  
  
  
SET NOCOUNT ON  
  
  
  
DECLARE @RecCount int  
  
SELECT @RecCount = @RecsPerPage * @Page + 1  
  
  
  
CREATE TABLE #TempItems  
  
(  
  
 SID int IDENTITY,  
  
 RegistrationID int,  
  
 RegNo int,  
  
 Animal nvarchar(255),  
  
 PrivateHerd nvarchar(255),  
  
 Birthdate datetime,  
  
 TypeService nvarchar(255),  
  
 SireName int,  
  
 DamName int,  
  
 MemberName nvarchar(255),  
  
 MemberNumber int,  
  
 Status nvarchar(255),  
  
 LastUpdate datetime,  
  
 pbs_id int,  
  
 outcount int,  
  
 avgmark decimal(4,2),  
  
 CertYear int,  
  
 SuperStakesNumber varchar(15)  
  
)  
  
  
  
-- Insert the rows from tblItems into the temp. table  
  
INSERT INTO #TempItems (RegistrationID, RegNo,  Animal, PrivateHerd, Birthdate, TypeService, SireName, DamName, MemberName,MemberNumber, Status, LastUpdate, PBS_ID, outcount, avgmark, CertYear, SuperStakesNumber)  
  
SELECT   
  
 reg.ID,  
  
 reg.RegNo,   
  
 reg.Animal,   
  
 reg.PrivateHerd,   
  
 reg.Birthdate,   
  
 reg.TypeService,   
  
 sire.regno Sire, --reg.Sire,   
  
 Dam.regno Dam, --reg.Dam,  
  
 LastName + ', ' + FirstName AS MemberName,  
  
 Members.MemberNumber,  
  
 reg.Status,   
  
 reg.Lastupdate,  
  
 reg.pbs_id,  
  
 bs.outcount,  
  
 bs.avgmark,  
  
 year(bc.CertificateDate) as CertYear,  
  
 ss.SuperStakesNumber  
  
FROM Registration reg  
  
INNER JOIN Members ON Reg.MemberNo = Members.MemberNumber  
  
left join BullStats bs on reg.pbs_id = bs.pbs_id  
  
left join Registration Sire on reg.sire = sire.regno and sire.memberno <> 1657  
  
left join Registration Dam on reg.dam = Dam.regno and Dam.memberno <> 1657  
  
left join BreedersCertificate bc on reg.regno = bc.sireregno  
  
left join SuperStakes ss on reg.regno = ss.regno  
  
WHERE   
  
(  
  
((@RegNo IS NULL) OR (reg.RegNo = @RegNo ))  
  
AND ((@MemberNumber IS NULL) OR (Members.MemberNumber = @MemberNumber))  
  
AND ((@RanchName IS NULL) OR (Members.RanchName = @RanchName))  
  
AND ((@Animal IS NULL) OR (reg.Animal LIKE '%' + @Animal + '%'))  
  
AND ((@TypeService IS NULL) OR (reg.TypeService LIKE '%' + @TypeService + '%'))  
  
AND ((@PrivateHerd IS NULL) OR (reg.PrivateHerd LIKE '%' + @PrivateHerd + '%'))  
  
AND ((@Birthdate IS NULL) OR (reg.Birthdate = @Birthdate))  
  
AND ((@Description IS NULL) OR (reg.Description LIKE '%' + @Description + '%'))  
  
AND ((@Horns IS NULL) OR (reg.Horns LIKE '%' + @Horns + '%'))  
  
AND ((@Status IS NULL) OR (reg.Status = @Status))  
  
AND ((@Dateregistered IS NULL) OR (reg.Dateregestered = @Dateregistered))  
  
AND ((@BreedersCertificateOnly = 0) or (BreedersCertid is not null))  
  
AND ((@SuperStakesOnly = 0) or (SuperStakesNumber is not null))  
  
and Members.MemberNumber <> 1657  
  
and reg.Status <> 'Waiting For Samples - Overdue'  
  
--and reg.sold <> 1  
  
)  
  
ORDER BY   
  
CASE WHEN @SortCol = 1  AND @SortDIR = 'ASC' THEN reg.RegNo END ASC,  
  
CASE WHEN @SortCol = 2  AND @SortDIR = 'ASC' THEN reg.Animal  END ASC,  
  
CASE WHEN @SortCol = 3  AND @SortDIR = 'ASC'  THEN reg.PrivateHerd  END ASC,  
  
CASE WHEN @SortCol = 4  AND @SortDIR = 'ASC' THEN reg.Birthdate  END ASC,  
  
CASE WHEN @SortCol = 5  AND @SortDIR = 'ASC' THEN reg.TypeService  END ASC,  
  
CASE WHEN @SortCol = 6  AND @SortDIR = 'ASC' THEN reg.Sire  END ASC,  
  
CASE WHEN @SortCol = 7  AND @SortDIR = 'ASC' THEN reg.Dam  END ASC,  
  
CASE WHEN @SortCol = 8  AND @SortDIR = 'ASC' THEN LastName + ', ' + FirstName  END ASC,  
  
CASE WHEN @SortCol = 9  AND @SortDIR = 'ASC' THEN reg.Status  END ASC,  
  
CASE WHEN @SortCol = 10  AND @SortDIR = 'ASC' THEN reg.Lastupdate  END ASC,  
  
CASE WHEN @SortCol = 1  AND @SortDIR = 'DESC' THEN reg.RegNo END DESC,  
  
CASE WHEN @SortCol = 2  AND @SortDIR = 'DESC' THEN reg.Animal  END DESC,  
  
CASE WHEN @SortCol = 3  AND @SortDIR = 'DESC'  THEN reg.PrivateHerd  END DESC,  
  
CASE WHEN @SortCol = 4  AND @SortDIR = 'DESC' THEN reg.Birthdate  END DESC,  
  
CASE WHEN @SortCol = 5  AND @SortDIR = 'DESC' THEN reg.TypeService  END DESC,  
  
CASE WHEN @SortCol = 6  AND @SortDIR = 'DESC' THEN reg.Sire  END DESC,  
  
CASE WHEN @SortCol = 7  AND @SortDIR = 'DESC' THEN reg.Dam  END DESC,  
  
CASE WHEN @SortCol = 8  AND @SortDIR = 'DESC' THEN LastName + ', ' + FirstName  END DESC,  
  
CASE WHEN @SortCol = 9  AND @SortDIR = 'DESC' THEN reg.Status  END DESC,  
  
CASE WHEN @SortCol = 10  AND @SortDIR = 'DESC' THEN reg.Lastupdate  END DESC  
  
  
  
-- Find out the first and last record we want   
  
DECLARE @FirstRec int, @LastRec int  
  
SELECT @FirstRec = (@Page - 1) * @RecsPerPage  
  
SELECT @LastRec = (@Page * @RecsPerPage + 1)  
  
  
  
-- Now, return the set of paged records, plus, an indiciation of we have more records or not!  
  
SELECT *,  
  
  
  
       MoreRecords =   
  
  
  
            (  
  
  
  
             SELECT COUNT(SID)   
  
  
  
             FROM #TempItems TI  
  
  
  
             WHERE TI.SID > @LastRec  
  
  
  
            ),  
  
  
  
               xCount =   
  
  
  
            (  
  
  
  
             SELECT COUNT(SID)   
  
  
  
             FROM #TempItems TI  
  
  
  
            )   
  
FROM #TempItems  
  
WHERE SID > @FirstRec AND SID < @LastRec  
  
  
  
-- Turn NOCOUNT back OFF  
  
SET NOCOUNT OFF  
Go
Grant Execute on _SearchAnimals_Front to ABBI_DEV
Go
IF Exists(Select * from sys.objects where name='_SearchAnimals_Front_ExportGridview' and Type='P')
Drop Procedure _SearchAnimals_Front_ExportGridview
Go
 CREATE    PROCEDURE [dbo].[_SearchAnimals_Front_ExportGridview]   
  
  
  
(  
  
  
  
 @RegNo int = null,  
  
  
  
 @MemberNumber int = null,  
  
  
  
 @RanchName nvarchar(255) = null,  
  
  
  
 @Animal nvarchar(255) = null,  
  
  
  
 @TypeService nvarchar(255) = null,  
  
  
  
 @PrivateHerd nvarchar(255) = null,  
  
  
  
 @Birthdate datetime = null,  
  
  
  
 @Description nvarchar(255) = null,  
  
  
  
 @Horns nvarchar(255) = null,  
  
  
  
 @Status nvarchar(255) = null,  
  
  
  
 @Dateregistered datetime = null,  
  
  
  
 @SortCol int = 1,   
  
  
  
 @SortDIR nvarchar(5) = 'ASC'  
  
  
  
)  
  
  
  
AS  
  
  
  
  
  
  
  
SET NOCOUNT ON  
  
  
  
  
  
  
  
CREATE TABLE #TempItems  
  
  
  
(  
  
  
  
 SID int IDENTITY,  
  
  
  
 RegistrationID int,  
  
  
  
 RegNo int,  
  
  
  
 Animal nvarchar(255),  
  
  
  
 PrivateHerd nvarchar(255),  
  
  
  
 Birthdate datetime,  
  
  
  
 TypeService nvarchar(255),  
  
  
  
 SireName nvarchar(255),  
  
  
  
 DamName nvarchar(255),  
  
  
  
 SireNo int,  
  
   
  
 DamNo int,  
  
  
  
 MemberName nvarchar(255),  
  
 Membernumber int,  
  
 Status nvarchar(255),  
  
  
  
 LastUpdate datetime  
  
  
  
)  
  
  
  
  
  
  
  
-- Insert the rows from tblItems into the temp. table  
  
  
  
INSERT INTO #TempItems (RegistrationID, RegNo,  Animal, PrivateHerd, Birthdate, TypeService, SireName, DamName,SireNo,DamNo, MemberName, Membernumber, Status, LastUpdate)  
  
  
  
SELECT   
  
  
  
 Registration.ID,  
  
  
  
 RegNo,   
  
  
  
 Animal,   
  
  
  
 PrivateHerd,   
  
  
  
 Birthdate,   
  
  
  
 TypeService,   
  
  
  
 (SELECT Animal FROM dbo.Registration Registration_1 WHERE Registration_1.RegNo = Registration.Sire) AS Sire,  
  
  
  
 (SELECT Animal FROM dbo.Registration Registration_1 WHERE Registration_1.RegNo = Registration.Dam) AS Dam,  
  
  
  
 Sire as SireNo,   
  
  
  
 Dam As DamNo,  
  
  
  
 LastName + ', ' + FirstName AS MemberName,  
  
 MemberNumber,  
  
 Status,   
  
  
  
 Lastupdate  
  
  
  
FROM Registration  
  
  
  
INNER JOIN Members ON Registration.MemberNo = Members.MemberNumber  
  
  
  
WHERE   
  
  
  
(  
  
  
  
((@RegNo IS NULL) OR (RegNo = @RegNo ))  
  
  
  
AND ((@MemberNumber IS NULL) OR (Members.MemberNumber = @MemberNumber))  
  
  
  
AND ((@RanchName IS NULL) OR (Members.RanchName = @RanchName))  
  
  
  
AND ((@Animal IS NULL) OR (Animal LIKE '%' + @Animal + '%'))  
  
  
  
AND ((@TypeService IS NULL) OR (TypeService LIKE '%' + @TypeService + '%'))  
  
  
  
AND ((@PrivateHerd IS NULL) OR (PrivateHerd LIKE '%' + @PrivateHerd + '%'))  
  
  
  
AND ((@Birthdate IS NULL) OR (Birthdate = @Birthdate))  
  
  
  
AND ((@Description IS NULL) OR (Description LIKE '%' + @Description + '%'))  
  
  
  
AND ((@Horns IS NULL) OR (Horns LIKE '%' + @Horns + '%'))  
  
  
  
AND ((@Status IS NULL) OR (Status = @Status))  
  
  
  
AND ((@Dateregistered IS NULL) OR (Dateregestered = @Dateregistered))  
  
  
  
and Members.MemberNumber <> 1657  
  
  
  
and Registration.Status <> 'Waiting For Samples - Overdue'  
  
  
  
and sold <> 1  
  
  
  
)  
  
  
  
ORDER BY   
  
  
  
CASE WHEN @SortCol = 1  AND @SortDIR = 'ASC' THEN Registration.RegNo END ASC,  
  
  
  
CASE WHEN @SortCol = 2  AND @SortDIR = 'ASC' THEN Animal  END ASC,  
  
  
  
CASE WHEN @SortCol = 3  AND @SortDIR = 'ASC'  THEN PrivateHerd  END ASC,  
  
  
  
CASE WHEN @SortCol = 4  AND @SortDIR = 'ASC' THEN Birthdate  END ASC,  
  
  
  
CASE WHEN @SortCol = 5  AND @SortDIR = 'ASC' THEN TypeService  END ASC,  
  
  
  
CASE WHEN @SortCol = 6  AND @SortDIR = 'ASC' THEN Sire  END ASC,  
  
  
  
CASE WHEN @SortCol = 7  AND @SortDIR = 'ASC' THEN Dam  END ASC,  
  
  
  
CASE WHEN @SortCol = 8  AND @SortDIR = 'ASC' THEN LastName + ', ' + FirstName  END ASC,  
  
  
  
CASE WHEN @SortCol = 9  AND @SortDIR = 'ASC' THEN Status  END ASC,  
  
  
  
CASE WHEN @SortCol = 10  AND @SortDIR = 'ASC' THEN Lastupdate  END ASC,  
  
  
  
CASE WHEN @SortCol = 1  AND @SortDIR = 'DESC' THEN Registration.RegNo END DESC,  
  
  
  
CASE WHEN @SortCol = 2  AND @SortDIR = 'DESC' THEN Animal  END DESC,  
  
  
  
CASE WHEN @SortCol = 3  AND @SortDIR = 'DESC'  THEN PrivateHerd  END DESC,  
  
  
  
CASE WHEN @SortCol = 4  AND @SortDIR = 'DESC' THEN Birthdate  END DESC,  
  
  
  
CASE WHEN @SortCol = 5  AND @SortDIR = 'DESC' THEN TypeService  END DESC,  
  
  
  
CASE WHEN @SortCol = 6  AND @SortDIR = 'DESC' THEN Sire  END DESC,  
  
  
  
CASE WHEN @SortCol = 7  AND @SortDIR = 'DESC' THEN Dam  END DESC,  
  
  
  
CASE WHEN @SortCol = 8  AND @SortDIR = 'DESC' THEN LastName + ', ' + FirstName  END DESC,  
  
  
  
CASE WHEN @SortCol = 9  AND @SortDIR = 'DESC' THEN Status  END DESC,  
  
  
  
CASE WHEN @SortCol = 10  AND @SortDIR = 'DESC' THEN Lastupdate  END DESC  
  
 
  
SELECT * FROM #TempItems  
  
SET NOCOUNT OFF  
Go
Grant Execute on _SearchAnimals_Front_ExportGridview to ABBI_DEV
Go
If Exists(Select * from sys.objects where name='' and type='P')
Drop Procedure _WorkOrders_Listnew
Go

--Created by RamaKrishna on 02/08/2021 to fetch all the records assigned to a person
--Previously Only 100 records fectched.
 
CREATE    PROCEDURE _WorkOrders_Listnew  
(  
 @WorkOrderNumber int = null,  
 @AssignedTo int = null,  
 @MemberNumber int = null,  
 @status nvarchar(50) = null,   
 @StartDate datetime = null,  
 @EndDate datetime = null,  
 @SortCol varchar(50) = 'WorkOrderNumber',   
 @SortDIR nvarchar(5) = 'Desc'  
)  
AS  
-- _WorkOrders_List 1,100, 20  

CREATE TABLE #TempWO  
(  
 SID int IDENTITY,  
 WorkOrderNumber int,   
 WorkOrderDate datetime,   
 MemberNumber int,   
 MemberName varchar(500),    
 Categories varchar(500),  
 AssignedBy varchar(100),   
 AssignedTo int,  
 AssignedToName varchar(100),   
 status varchar(25)  
)  
  
  
-- Insert the rows from tblItems into the temp. table  
INSERT INTO #TempWO (  
 WorkOrderNumber,   
 WorkOrderDate,   
 MemberNumber,   
 MemberName,  
 Categories ,  
 AssignedBy ,   
 AssignedTo,  
 AssignedToName ,   
 status)  
select WorkOrderNumber, WorkOrderDate, wo.MemberNumber, m.MemberName,    
case when membershiprenewalprice is not null   
 or membershipupgradetype is not null then  
  coalesce(dbo.fu_WorkOrder_CategoryList(workordernumber) + ', Membership','Membership')  
 else dbo.fu_WorkOrder_CategoryList(workordernumber) end as categories,  
wo.AssignedBy, wo.assignedTo, u.FirstName + ' ' + u.LastName as AssignedToName, status  
from WorkOrderMain wo  
join Members m on wo.MemberNumber = m.MemberNumber  
left join Users u on wo.AssignedTo = u.UserId  
WHERE (@WorkOrderNumber is not null and WorkOrderNumber = @WorkOrderNumber)  
or  
(@WorkOrderNumber is null and ((@AssignedTo is NULL) OR (AssignedTo = @AssignedTo))  
AND ((@MemberNumber IS NULL) OR (m.MemberNumber = @MemberNumber))  
AND ((@Status IS NULL and isnull(status,'') not in ( 'Complete', 'Closed')) OR (Status = @status) or (@Status='Any'))  
AND ((@StartDate is null) or (WorkOrderDate >= @StartDate))  
and ((@EndDate is null) or (WorkOrderDate < DateAdd(day, datediff(day, 0, @EndDate) + 1, 0))))  
  
ORDER BY --  
CASE WHEN @SortCol = 'WorkOrderNumber'  AND @SortDIR = 'ASC' THEN WorkOrderNumber END ASC,  
CASE WHEN @SortCol = 'WorkOrderNumber'  AND @SortDIR = 'DESC' THEN WorkOrderNumber END DESC,  
CASE WHEN @SortCol = 'WorkOrderDate'  AND @SortDIR = 'ASC' THEN WorkOrderDate  END ASC,  
CASE WHEN @SortCol = 'WorkOrderDate'  AND @SortDIR = 'DESC' THEN WorkOrderDate  END DESC,  
CASE WHEN @SortCol = 'MemberName'  AND @SortDIR = 'ASC' THEN MemberName  END ASC,  
CASE WHEN @SortCol = 'MemberName'  AND @SortDIR = 'DESC' THEN MemberName  END DESC,  
CASE WHEN @SortCol = 'AssignedBy'  AND @SortDIR = 'ASC' THEN AssignedBy  END ASC,  
CASE WHEN @SortCol = 'AssignedBy'  AND @SortDIR = 'DESC' THEN AssignedBy  END DESC,  
CASE WHEN @SortCol = 'AssignedTo'  AND @SortDIR = 'ASC' THEN u.FirstName + ' ' + u.LastName  END ASC,  
CASE WHEN @SortCol = 'AssignedTo'  AND @SortDIR = 'DESC' THEN u.FirstName + ' ' + u.LastName  END DESC,  
CASE WHEN @SortCol = 'Status'  AND @SortDIR = 'ASC' THEN status  END ASC,  
CASE WHEN @SortCol = 'Status'  AND @SortDIR = 'DESC' THEN status  END DESC  
  

SELECT *,  
  
       MoreRecords =   
  
            (  
  
             SELECT COUNT(SID)   
  
             FROM #TempWO TI  
			 WHERE TI.SID<@@FETCH_STATUS
             ),  
  
               xCount =   
  
            (  
  
             SELECT COUNT(SID)   
  
             FROM #TempWO TI  
  
            )   
FROM #TempWO  
Go
Grant Execute On _WorkOrders_Listnew to ABBI_DEV
Go

If Exists(Select * from sys.objects where name='_UpdateMemprintpending' and Type='P')
Drop Procedure _UpdateMemprintpending
Go
/*
Created by RamaKrishna on 02/08/2021 to update printpending for a member in Label Reports - Certificate
*/
Create Procedure _UpdateMemprintpending
(
@MemberNo int,
@Action nvarchar(10)
)
As
Begin
If @Action='Add'
Begin
	Declare @cnt int=0
	Declare @Itemsel int=0
	SELECT @cnt=COUNT(MemberNumber) FROM Members WHERE MemberNumber = @MemberNo
	If @cnt>0
	Begin
		UPDATE Registration SET PendingPrinting = 1 WHERE MemberNo = @MemberNo
		SET @Itemsel=1
	End
End
If @Action='Delete'
Begin
	UPDATE Registration SET PendingPrinting = 0 WHERE MemberNo = @MemberNo
	SET @Itemsel=1
End
If @Itemsel=1
Begin
	SELECT DISTINCT MemberNumber, LastName + ', ' + FirstName AS MemberName 
	FROM Members INNER JOIN Registration ON Members.MemberNumber = Registration.MemberNo 
	WHERE PendingPrinting = 1
End
End
Go
Grant Execute on _UpdateMemprintpending to ABBI_DEV
Go
If Exists(Select * from sys.objects where name='_InstempmemberLabel' and Type='P')
Drop Procedure _InstempmemberLabel
Go
/*
Created by RamaKrishna on 02/08/2021 to add/delete  a member record in Print label-membership
*/
Create Procedure _InstempmemberLabel
(
@MemberNo int,
@Action nvarchar(10)
)
As
Begin
If @Action='Add'
Begin
        Declare @cnt int=0
        Declare @cnt1 int=0
        Declare @Itemsel int=0
        SELECT @cnt=COUNT(MemberNumber) FROM Members WHERE MemberNumber = @MemberNo
        If @cnt>0
        Begin
                SELECT @cnt1=COUNT(MemberNumber) FROM tempMembershipLabel WHERE MemberNumber = @MemberNo
                IF @cnt1=0
                BEGIN
                        INSERT INTO tempMembershipLabel (MemberNumber) VALUES (@MemberNo)
                        IF @@ERROR=0
                        SET @Itemsel=1
                End
        End
End
If @Action='Delete'
Begin
        DELETE FROM tempMembershipLabel WHERE MemberNumber = @MemberNo
End
If @Itemsel=1
Begin
        SELECT tempMembershipLabelID, LastName + ', ' + FirstName AS MemberName, tempMembershipLabel.MemberNumber 
        FROM tempMembershipLabel 
        INNER JOIN Members ON tempMembershipLabel.MemberNumber = Members.MemberNumber
End
End
Go
Grant Execute on _InstempmemberLabel to ABBI_DEV
Go                                
If exists(select * from sys.objects where name='_WorkOrders_Listnew'  and type='P')
Drop Procedure _WorkOrders_Listnew
Go   
/*Created by Ramakrishna on 02/08/2021 to show all the workorders assigned to a person.Earlier only 100 workorders showning in Screen 
	Modified by RamaKrishna on 02/09/2021 to Show the DNA kits in contains Column.
*/
CREATE   PROCEDURE _WorkOrders_Listnew      
(    
 @WorkOrderNumber int = null,    
 @AssignedTo int = null,    
 @MemberNumber int = null,    
 @status nvarchar(50) = null,     
 @StartDate datetime = null,    
 @EndDate datetime = null,    
 @SortCol varchar(50) = 'WorkOrderNumber',     
 @SortDIR nvarchar(5) = 'Desc',
 @Contains nvarchar(20)=null
)    
AS    
-- _WorkOrders_List 1,100, 20    
  
CREATE TABLE #TempWO    
(    
 SID int IDENTITY,    
 WorkOrderNumber int,     
 WorkOrderDate datetime,     
 MemberNumber int,     
 MemberName varchar(500),      
 Categories varchar(500),    
 AssignedBy varchar(100),     
 AssignedTo int,    
 AssignedToName varchar(100),     
 status varchar(25)    
)    
    
    
-- Insert the rows from tblItems into the temp. table    
INSERT INTO #TempWO (    
 WorkOrderNumber,     
 WorkOrderDate,     
 MemberNumber,     
 MemberName,    
 Categories ,    
 AssignedBy ,     
 AssignedTo,    
 AssignedToName ,     
 status)    
select WorkOrderNumber, WorkOrderDate, wo.MemberNumber, m.MemberName,      
case when membershiprenewalprice is not null     
 or membershipupgradetype is not null then    
  coalesce(dbo.fu_WorkOrder_CategoryListnew(workordernumber) + ', Membership','Membership')    
 else dbo.fu_WorkOrder_CategoryListnew(workordernumber) end as categories,    
wo.AssignedBy, wo.assignedTo, u.FirstName + ' ' + u.LastName as AssignedToName, status    
from WorkOrderMain wo    
join Members m on wo.MemberNumber = m.MemberNumber    
left join Users u on wo.AssignedTo = u.UserId    
WHERE (@WorkOrderNumber is not null and WorkOrderNumber = @WorkOrderNumber)    
or    
(@WorkOrderNumber is null and ((@AssignedTo is NULL) OR (AssignedTo = @AssignedTo))    
AND ((@MemberNumber IS NULL) OR (m.MemberNumber = @MemberNumber))    
AND ((@Status IS NULL and isnull(status,'') not in ( 'Complete', 'Closed')) OR (Status = @status) or (@Status='Any'))    
AND ((@StartDate is null) or (WorkOrderDate >= @StartDate))    
and ((@EndDate is null) or (WorkOrderDate < DateAdd(day, datediff(day, 0, @EndDate) + 1, 0))))
And ((@Contains is null) or ((dbo.fu_WorkOrder_CategoryListnew(workordernumber)=@Contains)))
    
ORDER BY --    
CASE WHEN @SortCol = 'WorkOrderNumber'  AND @SortDIR = 'ASC' THEN WorkOrderNumber END ASC,    
CASE WHEN @SortCol = 'WorkOrderNumber'  AND @SortDIR = 'DESC' THEN WorkOrderNumber END DESC,    
CASE WHEN @SortCol = 'WorkOrderDate'  AND @SortDIR = 'ASC' THEN WorkOrderDate  END ASC,    
CASE WHEN @SortCol = 'WorkOrderDate'  AND @SortDIR = 'DESC' THEN WorkOrderDate  END DESC,    
CASE WHEN @SortCol = 'MemberName'  AND @SortDIR = 'ASC' THEN MemberName  END ASC,    
CASE WHEN @SortCol = 'MemberName'  AND @SortDIR = 'DESC' THEN MemberName  END DESC,    
CASE WHEN @SortCol = 'AssignedBy'  AND @SortDIR = 'ASC' THEN AssignedBy  END ASC,    
CASE WHEN @SortCol = 'AssignedBy'  AND @SortDIR = 'DESC' THEN AssignedBy  END DESC,    
CASE WHEN @SortCol = 'AssignedTo'  AND @SortDIR = 'ASC' THEN u.FirstName + ' ' + u.LastName  END ASC,    
CASE WHEN @SortCol = 'AssignedTo'  AND @SortDIR = 'DESC' THEN u.FirstName + ' ' + u.LastName  END DESC,    
CASE WHEN @SortCol = 'Status'  AND @SortDIR = 'ASC' THEN status  END ASC,    
CASE WHEN @SortCol = 'Status'  AND @SortDIR = 'DESC' THEN status  END DESC    
    
  
SELECT *,    
    
       MoreRecords =     
    
            (    
    
             SELECT COUNT(SID)     
    
             FROM #TempWO TI    
    WHERE TI.SID<@@FETCH_STATUS  
             ),    
    
               xCount =     
    
            (    
    
             SELECT COUNT(SID)     
    
             FROM #TempWO TI    
    
            )     
FROM #TempWO    
    
-- Turn NOCOUNT back OFF    
SET NOCOUNT OFF    
Go
Grant Execute on _WorkOrders_Listnew to ABBI_DEV
Go
    
--------------------------------------------------------------      
Delete from WorkOrderCategory where Category='DNA kits'
Go
Insert into WorkOrderCategory(Category,Note,SortOrder)
 Values('DNA kits','DNA items',55)  
    
  
  
  

















