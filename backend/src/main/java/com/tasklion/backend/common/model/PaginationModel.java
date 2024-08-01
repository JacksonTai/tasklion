package com.tasklion.backend.common.model;

import com.tasklion.backend.common.util.PageUtil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaginationModel {

    private int page = PageUtil.DEFAULT_PAGE;
    private int size = PageUtil.DEFAULT_SIZE;

}
