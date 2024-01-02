import React, { useState, useEffect } from'react';
import axios from 'axios';
// import usePathString from './usePathString';

export const useGetUserDetails = (id) => {
    const [userDetails, setUserDetails] = useState({});
    // const webUrl = usePathString();

    // $.ajax({
    //     url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='i:0%23.f|membership|" + $scope.teamLeadEmail + "'",                        
    //     headers: {                        
    //     "Accept": "application/json; odata=verbose"                        
    //     },                        
    //     async: false,                        
    //     contentType: "application/json; odata=verbose",                        
    //     success: function(data){                            
    //         ////console.log('profile data ', data.d);
    //         if(data.d){
    //             let userProfilePropertiesArr = data.d.UserProfileProperties.results;
    //             for (let i = 0; i < userProfilePropertiesArr.length; i++){
    //                 if(userProfilePropertiesArr[i]['Key'] == 'EYWorkLocationAddressCountry'){
    //                     $scope.Country = userProfilePropertiesArr[i]['Value'];
    //                 }
    //             }
    //             let userDetails = {
    //                 DisplayName : data.d.DisplayName,
    //                 PictureUrl : data.d.PictureUrl,
    //                 Title : data.d.Title,
    //                 Email: data.d.Email,
    //                 Country: $scope.Country
    //             }

    //             $scope.selectedPage.leaderDetails = userDetails;
    //             scsFamilyData.getTeamDataInd(data.d.DisplayName).then(function(data){
    //                 $scope.selectedPage.leaderDetails.Title = data.d.results[0].field_1;
    //             });

    //         }
    //     }   
    // });   


    axios.get("siteUrl_api/web/siteusers('" + id +"')", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                //console.log('user response', response);
                // let newUserDetails = {
                //     Title: '',
                //     Department: '',
                //     Loaction: ''
                // }
                // response.data.UserProfileProperties.forEach(function (item) {
                //     if (item.Key === 'Title') {
                //         userDetails.Title = item.Value;
                //     }
                //     if (item.Key === 'Department') {
                //         userDetails.Department = item.Value;
                //     }
                //     if (item.Key === 'EYAreaDescription') {
                //         userDetails.Location = item.Value;
                //     }

                // });

                // setUserDetails({ ...userDetails }, newUserDetails);
                // //console.log('user details final ', userDetails);

  
        return response.data;
  })
 
}

